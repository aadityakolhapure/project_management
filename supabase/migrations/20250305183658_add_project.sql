create table public.projects (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone null,
  name text null,
  description text null,
  readme text null,
  created_by uuid null,
  closed boolean null,
  constraint projects_pkey primary key (id),
  constraint projects_created_by_fkey foreign KEY (created_by) references auth.users (id) on delete CASCADE,
  constraint projects_created_by_fkey1 foreign KEY (created_by) references users (id) on delete CASCADE
) TABLESPACE pg_default;