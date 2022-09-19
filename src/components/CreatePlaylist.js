import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { spotifyApi } from '../utils/spotify';
import { useDispatch } from 'react-redux';
import { fetchPlayUserPlaylist } from '../features/playlist';
import { ExclamationIcon } from '@heroicons/react/solid';

const validationSchema = Yup.object({
  name: Yup.string().min(4).required(),
  description: Yup.string(),
});

export default function ({ open, onClose }) {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (spotifyApi.getAccessToken()) {
          await spotifyApi.createPlaylist(values.name, { description: values.description });
          dispatch(fetchPlayUserPlaylist());
          onClose();
        }
      } catch (error) {
        setError(error.message || 'Error to create playlist');
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    if (!open) {
      form.resetForm();
      setError('');
    }
  }, [open]);

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <form onSubmit={form.handleSubmit}>
                <Dialog.Panel className='w-screen max-w-sm transform overflow-hidden rounded-lg bg-black/90 text-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-xl font-medium leading-4'>
                    Create Playlist
                  </Dialog.Title>
                  <div className='w-full h-[1px] bg-green-800 mt-4'></div>
                  <div className='mt-4'>
                    {error && (
                      <p className='text-red-500 mb-3 flex items-center'>
                        <ExclamationIcon className='w-[25px] h-[25px] mr-1' />
                        {error}
                      </p>
                    )}
                    <div className='mb-4'>
                      <input
                        placeholder='Name'
                        className='px-2 py-2 rounded-md w-full outline-none focus:border-green-600 border-2 text-black text-sm'
                        {...form.getFieldProps('name')}
                      />
                      {form.errors.name && <span className='text-red-400 text-sm mt-2'>{form.errors.name}</span>}
                    </div>
                    <div>
                      <input
                        placeholder='Description'
                        className='px-2 py-2 rounded-md w-full outline-none focus:border-green-600 border-2 text-black text-sm'
                        name='description'
                        {...form.getFieldProps('description')}
                      />
                      {form.errors.description && (
                        <span className='text-red-400 text-sm mt-2'>{form.errors.description}</span>
                      )}
                    </div>
                  </div>
                  <div className='mt-6'>
                    <button
                      type='submit'
                      className='inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </form>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
