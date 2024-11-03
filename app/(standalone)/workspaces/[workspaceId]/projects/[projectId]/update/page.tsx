import { getCurrent } from '@/features/auth/queries/get-current';
import { EditProjectForm } from '@/features/projects/components/edit-project-form';
import { getProject } from '@/features/projects/queries';
import { redirect } from 'next/navigation';

interface StandaloneProjectIdProps {
  params:{
    projectId: string
  }
}

const StandaloneProjectId = async({params}: StandaloneProjectIdProps) => {
  const user = await getCurrent();

  const initialValues = await getProject({ projectId: params.projectId });

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (!initialValues) {
    throw new Error("404 Project not found");
  }

  return (
    <div>
      <EditProjectForm initialValues={initialValues} />
    </div>
  )
}

export default StandaloneProjectId