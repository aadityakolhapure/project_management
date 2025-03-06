create table public.users (
  id uuid not null,
  created_at timestamp with time zone not null default now(),
  email text null,
  name text null,
  description text null,
  avatar character varying null,
  updated_at timestamp with time zone null,
  links jsonb[] null,
  provider text null,
  constraint users_pkey primary key (id),
  constraint users_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;