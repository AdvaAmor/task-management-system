export type TTaskSchema =  {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  projectId: TProjectSchema['_id'];
};

export type TProjectSchema = {
  _id: string;
  name: string;
  description?:string;
};

export type TProject = {
  id: string;
  name: string;
  description?: string;
};

export type TTask = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status?: 'todo' | 'in-progress' | 'done';
};




