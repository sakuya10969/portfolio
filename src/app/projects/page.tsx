import { ProjectsPage } from "@/pages/projects";

type Props = {
  searchParams: Promise<{ category?: string; technology?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return <ProjectsPage filter={params} />;
}
