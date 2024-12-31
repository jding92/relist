-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  user_address address,
  shop_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint username_length check (char_length(username) >= 3)
);

-- Platform connections
create table public.platform_connections (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  platform_name text not null,
  platform_user_id text,
  access_token text,
  refresh_token text,
  token_expires_at timestamp with time zone,
  shop_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, platform_name)
);

-- Listings table
create table public.listings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  price decimal(10,2) not null,
  quantity integer not null default 1,
  condition text,
  category text,
  brand text,
  size text,
  color text,
  status text default 'draft' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Listing images
create table public.listing_images (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  url text not null,
  position integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Platform listings (cross-posts)
create table public.platform_listings (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  platform_name text not null,
  platform_listing_id text not null,
  status text default 'active' not null,
  url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(listing_id, platform_name)
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.platform_connections enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.platform_listings enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Platform connections policies
create policy "Users can view own platform connections"
  on public.platform_connections for select
  using (auth.uid() = user_id);

create policy "Users can insert own platform connections"
  on public.platform_connections for insert
  with check (auth.uid() = user_id);

create policy "Users can update own platform connections"
  on public.platform_connections for update
  using (auth.uid() = user_id);

create policy "Users can delete own platform connections"
  on public.platform_connections for delete
  using (auth.uid() = user_id);

-- Listings policies
create policy "Listings are viewable by everyone"
  on public.listings for select
  using (true);

create policy "Users can insert own listings"
  on public.listings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own listings"
  on public.listings for update
  using (auth.uid() = user_id);

create policy "Users can delete own listings"
  on public.listings for delete
  using (auth.uid() = user_id);

-- Listing images policies
create policy "Listing images are viewable by everyone"
  on public.listing_images for select
  using (true);

create policy "Users can insert images for own listings"
  on public.listing_images for insert
  with check (
    auth.uid() = (
      select user_id from public.listings
      where id = listing_id
    )
  );

create policy "Users can delete images from own listings"
  on public.listing_images for delete
  using (
    auth.uid() = (
      select user_id from public.listings
      where id = listing_id
    )
  );

-- Platform listings policies
create policy "Platform listings are viewable by listing owner"
  on public.platform_listings for select
  using (
    auth.uid() = (
      select user_id from public.listings
      where id = listing_id
    )
  );

create policy "Users can insert platform listings for own listings"
  on public.platform_listings for insert
  with check (
    auth.uid() = (
      select user_id from public.listings
      where id = listing_id
    )
  );

create policy "Users can update own platform listings"
  on public.platform_listings for update
  using (
    auth.uid() = (
      select user_id from public.listings
      where id = listing_id
    )
  );

-- Functions and triggers
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger handle_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.platform_connections
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.listings
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.platform_listings
  for each row
  execute function public.handle_updated_at(); 