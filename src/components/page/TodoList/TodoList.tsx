'use client';
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodoQuery,
  usePostTodoMutation,
  useUplaodTodoMutation,
} from '@/redux/api/todo';
import scss from './TodoList.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

import Image from 'next/image';
import { useState } from 'react';

interface ITodo {
  name: string;
  url: string;
  price: number;
  file: string;
}
const TodoList = () => {
  const [saveDataMutation] = usePostTodoMutation();
  const [uplaodFile] = useUplaodTodoMutation();
  const { data } = useGetTodoQuery();
  const { register, handleSubmit, reset } = useForm<ITodo>();
  const [deleteMutation] = useDeleteTodoMutation();
  const [editMutation] = useEditTodoMutation();
  const [edit, setEdit] = useState<number | null>(null);
  const saveData: SubmitHandler<ITodo> = async (data) => {
    try {
      const file = data.file[0];
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      const { data: responseData } = await uplaodFile(formDataObj);
      const newData = {
        name: data.name,
        url: data.url,
        price: data.price,
        file: responseData.url,
      };
      await saveDataMutation(newData);
      reset();
    } catch (error) {
      alert(error.messages);
    }
  };
  const editData: SubmitHandler<ITodo> = async (data, id: number) => {
    try {
      const file = data.file[0];
      const formData = new FormData();
      formData.append('file', file);
      const { data: responseData } = await uplaodFile(formData);
      const newData = {
        name: data.name,
        url: data.url,
        price: data.price,
        file: responseData.url,
      };
      await editMutation({ _id: id, newData });
      reset();
      setEdit(null);
    } catch (error) {
      console.log(error.messages);
    }
  };
  return (
    <section className={scss.TodoList}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(saveData)}>
            <input type="text" placeholder="Name" {...register('name', { required: true })} />
            <input type="text" placeholder="Url" {...register('url', { required: true })} />
            <input type="number" placeholder="Price" {...register('price', { required: true })} />
            <input type="file" placeholder="File" {...register('file', { required: true })} />
            <button type="submit">Save</button>
          </form>
          <div className={scss.blogs}>
            {data?.map((el) => (
              <div key={el._id} className={scss.box}>
                <a onClick={() => deleteMutation(el._id)}>
                  <IoMdClose />
                </a>
                <Image className={scss.url} src={el.url} alt="image" width={200} height={200} />
                <Image className={scss.file} src={el.file} alt="image" width={200} height={200} />
                <h1>{el.name}</h1>
                <h2>{el.price}</h2>
                <form onSubmit={handleSubmit((data) => editData(data, el._id))}>
                  <input type="text" placeholder="Name" {...register('name', { required: true })} />
                  <input type="text" placeholder="Url" {...register('url', { required: true })} />
                  <input
                    type="number"
                    placeholder="Price"
                    {...register('price', { required: true })}
                  />
                  <input type="file" placeholder="File" {...register('file', { required: true })} />
                  <button type="submit">Edit</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
