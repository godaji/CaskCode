-- CMPA-893: Fix infinite recursion in RLS policies
-- Problem: jar_members_select policy queries jar_members → triggers its own policy → infinite loop
-- Fix: use security definer function my_jar_ids() that bypasses RLS for the lookup

-- 1. Create the helper function
create or replace function public.my_jar_ids()
returns setof text as $$
  select jar_id from public.jar_members where user_id = public.current_user_id();
$$ language sql stable security definer;

-- 2. Drop old recursive policies
drop policy if exists "jars_select" on public.jars;
drop policy if exists "jar_members_select" on public.jar_members;
drop policy if exists "entries_select" on public.entries;
drop policy if exists "donation_out_select" on public.donation_out;
drop policy if exists "donation_out_insert" on public.donation_out;
drop policy if exists "donation_in_select" on public.donation_in;
drop policy if exists "donation_in_insert" on public.donation_in;

-- 3. Recreate with my_jar_ids()
create policy "jars_select" on public.jars for select using (
  jar_id in (select public.my_jar_ids())
  or owner_id = public.current_user_id()
);

create policy "jar_members_select" on public.jar_members for select using (
  jar_id in (select public.my_jar_ids())
);

create policy "entries_select" on public.entries for select using (
  jar_id in (select public.my_jar_ids())
);

create policy "donation_out_select" on public.donation_out for select using (
  from_jar_id in (select public.my_jar_ids())
  or to_jar_id in (select public.my_jar_ids())
);
create policy "donation_out_insert" on public.donation_out for insert with check (
  from_jar_id in (select public.my_jar_ids())
);

create policy "donation_in_select" on public.donation_in for select using (
  to_jar_id in (select public.my_jar_ids())
  or from_jar_id in (select public.my_jar_ids())
);
create policy "donation_in_insert" on public.donation_in for insert with check (
  to_jar_id in (select public.my_jar_ids())
  or from_jar_id in (select public.my_jar_ids())
);
