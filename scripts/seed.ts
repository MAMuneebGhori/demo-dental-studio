import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';

const DOCTORS = [
  { id: uuidv4(), name: 'Dr. Anna Berzina', specialty: 'Orthodontics', email: 'anna.berzina@demodental.com' },
  { id: uuidv4(), name: 'Dr. Marcis Ozols', specialty: 'Endodontics', email: 'marcis.ozols@demodental.com' },
  { id: uuidv4(), name: 'Dr. Laura Kalnina', specialty: 'General Dentistry', email: 'laura.kalnina@demodental.com' }
];

const PATIENTS = [
  'Sarah Jenkins', 'Michael Chen', 'Emily Davis', 'James Wilson', 'Olivia Brown',
  'David Miller', 'Sophia Taylor', 'Robert Anderson', 'Isabella Thomas', 'William Jackson',
  'Mia White', 'Joseph Harris', 'Charlotte Martin', 'Charles Thompson', 'Amelia Garcia'
];

const PROCEDURES = [
  { name: 'Routine Cleaning', price: 150 },
  { name: 'Teeth Whitening', price: 300 },
  { name: 'Cavity Filling', price: 250 },
  { name: 'Root Canal', price: 1200 },
  { name: 'Dental Crown', price: 1500 },
  { name: 'Veneers (per tooth)', price: 1800 },
  { name: 'Dental Implant', price: 2500 }
];

async function seed() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to Supabase Postgres.');

    // 1. Update Schema
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.clinic_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        clinic_name TEXT NOT NULL,
        address TEXT,
        contact_email TEXT
      );

      CREATE TABLE IF NOT EXISTS public.services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        price NUMERIC NOT NULL
      );

      ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS cost NUMERIC DEFAULT 0;
      ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS notes TEXT;
      
      ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS working_hours_start TIME DEFAULT '09:00:00';
      ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS working_hours_end TIME DEFAULT '17:00:00';
      ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS lunch_break_duration INT DEFAULT 60;
      ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS days_off TEXT[] DEFAULT '{}';
    `);

    // Temporarily drop FK to auth.users if it exists to allow demo seed without full auth setup
    await client.query(`
      ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
    `);

    console.log('Schema updated.');

    // 2. Inject Clinic Settings & Services
    await client.query(`TRUNCATE TABLE public.clinic_settings, public.services CASCADE`);
    await client.query(`
      INSERT INTO public.clinic_settings (clinic_name, address, contact_email) 
      VALUES ('DEMO Dental Studio', '123 Forest Ave, Suite 100', 'hello@demodental.com')
    `);

    for (const proc of PROCEDURES) {
      await client.query('INSERT INTO public.services (name, price) VALUES ($1, $2)', [proc.name, proc.price]);
    }

    // 3. Inject Doctors
    await client.query(`DELETE FROM public.profiles WHERE role = 'doctor'`);
    for (const doc of DOCTORS) {
      await client.query(`
        INSERT INTO public.profiles (id, role, full_name, specialty, working_hours_start, working_hours_end)
        VALUES ($1, 'doctor', $2, $3, '09:00:00', '17:00:00')
        ON CONFLICT (id) DO NOTHING;
      `, [doc.id, doc.name, doc.specialty]);
    }

    // 4. Inject 30 randomized appointments
    await client.query(`TRUNCATE TABLE public.appointments CASCADE`);
    const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
    
    let appointmentsInserted = 0;
    const now = new Date();
    
    for (let i = 0; i < 30; i++) {
      const patient = PATIENTS[Math.floor(Math.random() * PATIENTS.length)];
      const doctor = DOCTORS[Math.floor(Math.random() * DOCTORS.length)];
      const procedure = PROCEDURES[Math.floor(Math.random() * PROCEDURES.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Random time between 3 days ago and 4 days ahead, between 9 AM and 5 PM
      const daysOffset = Math.floor(Math.random() * 8) - 3;
      const hourOffset = Math.floor(Math.random() * 8) + 9;
      const aptTime = new Date(now);
      aptTime.setDate(now.getDate() + daysOffset);
      aptTime.setHours(hourOffset, 0, 0, 0);

      await client.query(`
        INSERT INTO public.appointments (patient_name, doctor_id, appointment_time, status, procedure_type, cost)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [patient, doctor.id, aptTime.toISOString(), status, procedure.name, procedure.price]);
      
      appointmentsInserted++;
    }

    console.log(`Successfully injected ${DOCTORS.length} doctors, ${PATIENTS.length} dummy patients, and ${appointmentsInserted} appointments.`);
    console.log('Seed completed.');

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.end();
  }
}

seed();
