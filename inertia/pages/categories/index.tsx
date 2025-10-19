import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Layout from '../../components/Layout'

interface Category {
  id: number
  nama: string
  created_at: string
  updated_at: string
}

interface Props {
  categories: {
    data: Category[]
    meta: any
  }
}

export default function CategoriesIndex({ categories }: Props) {
  const [showModal, setShowModal] = useState(false)
  const { data, setData, post, processing, errors, reset } = useForm({
    nama: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/api/categories', {
      onSuccess: () => {
        setShowModal(false)
        reset()
      }
    })
  }

  return (
    <>
      <Head title="Categories" />
      <Layout title="Categories">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Category
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.data.map((category) => (
              <div key={category.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{category.nama}</h3>
                  <div className="flex space-x-2">
                    <Link
                      href={`/categories/${category.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-900 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(category.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {categories.data.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl">📂</span>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Add Category
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add Category Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)} />
              
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Add New Category
                    </h3>
                    <div>
                      <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                        Category Name
                      </label>
                      <input
                        type="text"
                        id="nama"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                      />
                      {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                    >
                      {processing ? 'Adding...' : 'Add Category'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}
