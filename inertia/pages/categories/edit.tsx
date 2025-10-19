import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Layout from '../../components/Layout'

interface Category {
  id: number
  nama: string
}

interface Props {
  category: Category
}

export default function CategoriesEdit({ category }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    nama: category.nama || '',
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    put(`/api/categories/${category.id}`)
  }

  return (
    <>
      <Head title="Edit Category" />
      <Layout title="Edit Category">
        <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Edit Category</h2>
            <Link
              href="/categories"
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              Back to Categories
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                id="nama"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={data.nama}
                onChange={(event) => setData('nama', event.target.value)}
              />
              {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/categories"
                className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {processing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  )
}
