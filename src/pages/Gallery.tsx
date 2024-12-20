import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const JournalGallery = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/journals?populate=*");
        setJournals(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch journal entries");
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading journal entries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Travel Journal Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.map((journal) => (
            <Card key={journal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {journal.attributes.image?.data && (
                <div className="relative h-48 w-full">
                  <img
                    src={`http://localhost:1337${journal.attributes.image.data.attributes.url}`}
                    alt={journal.attributes.place}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {journal.attributes.place}
                </CardTitle>
                <div className="text-sm text-gray-600">
                  {journal.attributes.state}, {journal.attributes.country}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 line-clamp-3">
                  {journal.attributes.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalGallery;