-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)

-- 1. Profiles: one row per club member, auto-created on signup
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  display_name text not null,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Progress: one row per (user, lab). Labs/topics themselves live in code
-- (lib/content), not the database, since the curriculum is authored by you.
create table if not exists lab_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  topic_id text not null,
  lab_id text not null,
  completed boolean default false,
  attempts int default 0,
  completed_at timestamptz,
  updated_at timestamptz default now(),
  unique (user_id, lab_id)
);

alter table lab_progress enable row level security;

create policy "Users can view their own progress"
  on lab_progress for select using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on lab_progress for insert with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on lab_progress for update using (auth.uid() = user_id);

-- Optional: let members see each other on a simple leaderboard later
create policy "Progress is viewable by everyone (for leaderboards)"
  on lab_progress for select using (true);
