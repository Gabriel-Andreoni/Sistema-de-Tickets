"use client";

import './page.css';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;


const schema = z.object({
  taskName: string()
    .min(10, 'Digite no mínimo 10 letras')
    .max(40, 'Digite no máximo 40 letras'),
  taskSubdescription: string()
    .min(10, 'Digite no mmínimo 10 letras')
    .max(80, 'Digite no mmáximo 80 letras'),
  taskDescription: string()
    .min(50, 'Digite no mínimo 30 letras')
    .max(800, 'Digite no máximo 300 letras'),
})

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    await fetch(`${VERCEL_URL}/tickets`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 100000000),
        taskName: data.taskName,
        taskSubdescription: data.taskSubdescription, 
        taskDescription: data.taskDescription
    })
    })
      .then((res) => alert('Ticket aberto com sucesso'))
      .catch((error) => console.log(error.message))
  }

  return (
    <main className="main-wrapper">
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="taskName-taskSubDescription-group">
          <input
            placeholder="Nome da Tarefa"
            {...register("taskName", { required: true })}
            defaultValue=""
          />
          {errors.taskName && <span className="span-error-taskName">{errors.taskName.message}</span>}

          <input
            placeholder="Breve descrição"
            {...register("taskSubdescription", { required: true })}
            defaultValue=""
          />
          {errors.taskSubdescription && <span className="span-error-taskSubDescription">{errors.taskSubdescription.message}</span>}

        </div>
        <textarea
          placeholder="Descrição da tarefa"
          {...register("taskDescription", { required: true })}
          defaultValue=""
        >
        </textarea>
        {errors.taskDescription && <span className="span-error-taskDescription">{errors.taskDescription.message}</span>}
        <button>Cadastrar ticket</button>
      </form>

    </main>
  );
}
