'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { faPlus, faList, faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Stats {
  totalTours: number
  publishedTours: number
  draftTours: number
  totalMedia: number
}

interface RecentTour {
  id: string
  title: string
  status: string
  updatedAt: string
}

interface TourApiResponse {
  id: string
  title: string
  status: string
  updatedAt: string
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalTours: 0,
    publishedTours: 0,
    draftTours: 0,
    totalMedia: 0,
  })
  const [recentTours, setRecentTours] = useState<RecentTour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch tours statistics
        const toursRes = await fetch('/api/tours?where[status][equals]=published&limit=1000&depth=0')
        if (toursRes.ok) {
          const toursData = await toursRes.json()
          const publishedCount = toursData.totalDocs || 0

          // Fetch draft tours
          const draftsRes = await fetch('/api/tours?where[status][equals]=draft&limit=1000&depth=0')
          let draftCount = 0
          if (draftsRes.ok) {
            const draftsData = await draftsRes.json()
            draftCount = draftsData.totalDocs || 0
          }

          // Fetch total tours
          const totalRes = await fetch('/api/tours?limit=1000&depth=0')
          let totalCount = 0
          if (totalRes.ok) {
            const totalData = await totalRes.json()
            totalCount = totalData.totalDocs || 0
          }

          setStats({
            totalTours: totalCount,
            publishedTours: publishedCount,
            draftTours: draftCount,
            totalMedia: 0, // Will update next
          })
        }

        // Fetch recent tours
        const recentRes = await fetch('/api/tours?sort=-updatedAt&limit=5&depth=0')
        if (recentRes.ok) {
          const recentData = await recentRes.json()
          const tours: TourApiResponse[] = recentData.docs || []
          setRecentTours(
            tours.map((tour) => ({
              id: tour.id,
              title: tour.title,
              status: tour.status,
              updatedAt: tour.updatedAt,
            }))
          )
        }

        // Fetch media count
        const mediaRes = await fetch('/api/media?limit=1000&depth=0')
        if (mediaRes.ok) {
          const mediaData = await mediaRes.json()
          setStats((prev) => ({
            ...prev,
            totalMedia: mediaData.totalDocs || 0,
          }))
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = ({
    title,
    value,
    icon,
    color,
  }) => (
    <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full`} style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Selamat datang di admin panel Wiatour</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tours"
          value={stats.totalTours}
          icon={<span className="text-2xl">📝</span>}
          color="#3B82F6"
        />
        <StatCard
          title="Published"
          value={stats.publishedTours}
          icon={<span className="text-2xl">✅</span>}
          color="#10B981"
        />
        <StatCard
          title="Drafts"
          value={stats.draftTours}
          icon={<span className="text-2xl">📄</span>}
          color="#F59E0B"
        />
        <StatCard
          title="Total Media"
          value={stats.totalMedia}
          icon={<span className="text-2xl">🖼️</span>}
          color="#8B5CF6"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/collections/tours/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create New Tour
          </Link>
          <Link
            href="/admin/collections/tours"
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FontAwesomeIcon icon={faList} className="mr-2" />
            View All Tours
          </Link>
          <Link
            href="/admin/collections/media"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FontAwesomeIcon icon={faImages} className="mr-2" />
            Manage Media
          </Link>
        </div>
      </div>

      {/* Recent Tours */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Tours</h2>
        {recentTours.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">No tours yet. Create your first tour to get started!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          tour.status
                        )}`}
                      >
                        {tour.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(tour.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/collections/tours/${tour.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
