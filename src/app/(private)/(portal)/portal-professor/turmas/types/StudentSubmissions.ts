export type StudentInfo = {
    id: string
    matricula: string
    nome: string
    email: string
  }
   
  export type WorkInfo = {
    id: string
    nome: string
    valor: number
  }
   
  export type StepInfo = {
    id: string
    nome: string
  }
   
  export type Submission = {
    student_id: string
    work_id: string
    file_url: string | null
    public_id: string | null
    submitted_at: Date | null
    grade: number | null
    is_graded:boolean
    student: StudentInfo
    work: WorkInfo
    step: StepInfo
  }
   
  // grouped for display
  export type StepGroup = {
    step: StepInfo
    submissions: Submission[]
  }