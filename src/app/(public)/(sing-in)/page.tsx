'use client'
import SingInFormProfessor from '@/src/components/ui/SingInFormProfessor';
import SingInFormStudent from '@/src/components/ui/SingInFormStudent';
import { useState } from 'react';

const SingIn = () => {
    const [formType, setFormType] = useState('student');

    return (
        <div>
            {formType == 'student' && <SingInFormStudent onToggleUserType={setFormType} />}

            {formType == 'professor' && <SingInFormProfessor onToggleUserType={setFormType} />}
        </div>
    )
}

export default SingIn;