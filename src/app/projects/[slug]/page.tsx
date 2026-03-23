import { ProjectDetailPage } from '@/views/project-detail';

type Props = { params: Promise<{ slug: string }> };

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProjectDetailPage slug={slug} />;
}
