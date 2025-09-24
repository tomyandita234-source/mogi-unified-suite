import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogAPI, Blog } from '@/lib/api';

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await BlogAPI.getAll();
        setBlogs(data.slice(0, 3)); // Hanya ambil 3 blog terbaru
        setLoading(false);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data blog');
        setLoading(false);
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  // Fungsi untuk memotong teks body
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Format tanggal
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-width relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Blog & Artikel Terbaru
          </h2>
          <p className="section-subtitle">
            Temukan informasi terbaru seputar teknologi, bisnis, dan tips untuk mengembangkan usaha Anda.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Memuat artikel...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {blogs.map((blog) => (
                <div key={blog._id} className="base-card overflow-hidden">
                  {/* Blog Image */}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={blog.image || '/placeholder.svg'} 
                      alt={blog.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Blog Content */}
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">
                      {formatDate(blog.createdAt)}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {truncateText(blog.body.replace(/<[^>]*>/g, ''), 120)}
                    </p>
                    <a href={`/blog/${blog.slug}`} className="inline-flex items-center text-primary font-medium">
                      Baca selengkapnya
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-12">
              <Button variant="outline" asChild>
                <a href="/blog">
                  Lihat Semua Artikel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;