'use client'
import SingInFormProfessor from '@/src/app/(public)/(sing-in)/components/forms/SingInFormProfessor';
import SingInFormStudent from '@/src/app/(public)/(sing-in)/components/forms/SingInFormStudent';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SingIn = () => {
    const [formType, setFormType] = useState('student');

    const searchParams = useSearchParams()

    const inviteToken = searchParams.get('invite')

    return (
        <div>
            {formType == 'student' && <SingInFormStudent onToggleUserType={setFormType} inviteToken={inviteToken}/>}

            {formType == 'professor' && <SingInFormProfessor onToggleUserType={setFormType} />}
        </div>
    )
}

export default SingIn;