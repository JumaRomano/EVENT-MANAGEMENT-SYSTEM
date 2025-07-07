import React from 'react';
import { EventFilters } from '../../types';
import { kenyanCounties } from '../../utils/kenyanData';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface EventFiltersProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
}

const categories = [
  'All Categories',
  'Technology & Innovation',
  'Business & Entrepreneurship',
  'Music & Entertainment',
  'Sports & Fitness',
  'Education & Training',
  'Arts & Culture',
  'Food & Drinks',
  'Health & Wellness',
  'Fashion & Beauty',
  'Agriculture',
  'Tourism & Travel',
  'Community & Social',
  'Religious & Spiritual',
  'Politics & Governance'
];

export function EventFiltersComponent({ filters, onFiltersChange }: EventFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      search: e.target.value || undefined,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      category: e.target.value === 'All Categories' ? undefined : e.target.value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      date: e.target.value || undefined,
    });
  };

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      county: e.target.value === 'All Counties' ? undefined : e.target.value,
    });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      priceRange: e.target.value === 'All Prices' ? undefined : e.target.value as any,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filter Events
        </h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="search"
              placeholder="Search events..."
              value={filters.search || ''}
              onChange={handleSearchChange}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category || 'All Categories'}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
            County
          </label>
          <select
            id="county"
            value={filters.county || 'All Counties'}
            onChange={handleCountyChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All Counties">All Counties</option>
            {kenyanCounties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={filters.date || ''}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            id="priceRange"
            value={filters.priceRange || 'All Prices'}
            onChange={handlePriceRangeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All Prices">All Prices</option>
            <option value="free">Free Events</option>
            <option value="under-1000">Under KES 1,000</option>
            <option value="1000-5000">KES 1,000 - 5,000</option>
            <option value="above-5000">Above KES 5,000</option>
          </select>
        </div>
      </div>
    </div>
  );
}