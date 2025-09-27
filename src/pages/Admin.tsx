import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit, Save, Eye, EyeOff } from "lucide-react";
import { BlogAPI, ProductAPI, UserAPI } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";
import type { Blog, Product } from '@/lib/api';

const Admin = () => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog> | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [blogImage, setBlogImage] = useState<File | null>(null);

  useEffect(() => {
    if (token) {
      fetchBlogs();
      fetchProducts();
    }
  }, [token]);

  const fetchBlogs = async () => {
    try {
      const response = await BlogAPI.getAll();
      setBlogs(response);
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch blogs",
      });
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await ProductAPI.getAll();
      setProducts(response);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch products",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // We need to adjust the API call to match the backend expectation
      // The backend expects username, not email
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const { token } = data;
        localStorage.setItem('token', token);
        setToken(token);
        setIsLoggedIn(true);
        fetchBlogs();
        fetchProducts();
        toast({
          title: "Login berhasil",
          description: "Selamat datang di dashboard admin",
        });
      } else {
        setError(data.message || 'Login gagal');
        toast({
          variant: "destructive",
          title: "Login gagal",
          description: data.message || 'Username atau password salah',
        });
      }
    } catch (error: any) {
      setError(error.message || 'Login gagal');
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: error.message || 'Terjadi kesalahan saat login',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
    setBlogs([]);
    setProducts([]);
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari sistem",
    });
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Blog functions
  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentBlog) {
      setCurrentBlog({
        ...currentBlog,
        [name]: value
      });
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditingBlog(true);
    setImagePreview(blog.image || null);
  };

  const handleNewBlog = () => {
    setCurrentBlog({
      title: '',
      slug: '',
      body: '',
      isShow: false
    });
    setIsEditingBlog(true);
    setImagePreview(null);
  };

  const handleSaveBlog = async () => {
    if (!currentBlog) return;
    
    try {
      if (currentBlog._id) {
        // Update existing blog
        const updatedBlog = await BlogAPI.update(currentBlog._id, currentBlog);
        setBlogs(blogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));
      } else {
        // Create new blog
        const newBlog = await BlogAPI.create(currentBlog);
        setBlogs([...blogs, newBlog]);
      }
      
      setIsEditingBlog(false);
      setCurrentBlog(null);
      setImagePreview(null);
      setBlogImage(null);
      
      toast({
        title: "Success",
        description: `Blog ${currentBlog._id ? 'updated' : 'created'} successfully`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Something went wrong',
      });
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      await BlogAPI.delete(id);
      setBlogs(blogs.filter(blog => blog._id !== id));
      
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Something went wrong',
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setBlogImage(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      if (currentBlog) {
        setCurrentBlog({
          ...currentBlog,
          image: base64String
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBlogVisibilityChange = (checked: boolean) => {
    if (currentBlog) {
      setCurrentBlog({
        ...currentBlog,
        isShow: checked
      });
    }
  };

  const generateSlug = () => {
    if (currentBlog && currentBlog.title) {
      const slug = currentBlog.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      setCurrentBlog({
        ...currentBlog,
        slug
      });
    }
  };

  // Product functions
  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        [name]: value
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditingProduct(true);
  };

  const handleNewProduct = () => {
    setCurrentProduct({
      name: '',
      slug: '',
      description: '',
      longDescription: '',
      category: 'pos',
      features: [],
      benefits: [],
      pricing: {
        basic: {
          price: '',
          period: '/bulan',
          features: []
        },
        pro: {
          price: '',
          period: '/bulan',
          features: []
        },
        enterprise: {
          price: 'Custom',
          period: '',
          features: []
        }
      },
      isActive: true,
      imageUrl: '',
      sortOrder: 0
    });
    setIsEditingProduct(true);
  };

  const handleSaveProduct = async () => {
    if (!currentProduct) return;
    
    try {
      if (currentProduct._id) {
        // Update existing product
        const updatedProduct = await ProductAPI.update(currentProduct._id, currentProduct);
        setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
      } else {
        // Create new product
        const newProduct = await ProductAPI.create(currentProduct);
        setProducts([...products, newProduct]);
      }
      
      setIsEditingProduct(false);
      setCurrentProduct(null);
      
      toast({
        title: "Success",
        description: `Product ${currentProduct._id ? 'updated' : 'created'} successfully`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Something went wrong',
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await ProductAPI.delete(id);
      setProducts(products.filter(product => product._id !== id));
      
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Something went wrong',
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    name="username"
                    type="text"
                    placeholder="Enter your username" 
                    value={loginData.username}
                    onChange={handleLoginInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    placeholder="Enter your password" 
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full">Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isEditingBlog) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="outline" onClick={() => {
          setIsEditingBlog(false);
          setImagePreview(null);
        }} className="mb-4">
          Back to Blogs
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{currentBlog?._id ? 'Edit Blog' : 'Add New Blog'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={currentBlog?.title || ''} 
                    onChange={handleBlogInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="slug">Slug</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="slug" 
                      name="slug"
                      value={currentBlog?.slug || ''} 
                      onChange={handleBlogInputChange}
                    />
                    <Button variant="outline" onClick={generateSlug}>
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="body">Content</Label>
                <Textarea 
                  id="body" 
                  name="body"
                  value={currentBlog?.body || ''} 
                  onChange={handleBlogInputChange}
                  className="min-h-[200px]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Featured Image</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isShow" 
                  checked={currentBlog?.isShow || false}
                  onCheckedChange={handleBlogVisibilityChange}
                />
                <Label htmlFor="isShow">Visible</Label>
              </div>
              <Button onClick={handleSaveBlog}>
                <Save className="mr-2 h-4 w-4" />
                Save Blog
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isEditingProduct) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="outline" onClick={() => {
          setIsEditingProduct(false);
        }} className="mb-4">
          Back to Products
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{currentProduct?._id ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={currentProduct?.name || ''} 
                    onChange={handleProductInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    name="slug"
                    value={currentProduct?.slug || ''} 
                    onChange={handleProductInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Short Description</Label>
                <Input 
                  id="description" 
                  name="description"
                  value={currentProduct?.description || ''} 
                  onChange={handleProductInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea 
                  id="longDescription" 
                  name="longDescription"
                  value={currentProduct?.longDescription || ''} 
                  onChange={handleProductInputChange}
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={currentProduct?.category || 'pos'}
                    onChange={(e) => {
                      if (currentProduct) {
                        setCurrentProduct({
                          ...currentProduct,
                          category: e.target.value
                        });
                      }
                    }}
                    className="border border-input bg-background rounded-md p-2"
                  >
                    <option value="pos">Mogi POS</option>
                    <option value="pay">MogiPay</option>
                    <option value="ops">Mogi Ops</option>
                    <option value="fleet">Mogi Fleet</option>
                    <option value="sign">MogiSign</option>
                    <option value="library">Mogi Library</option>
                    <option value="kampuz">Mogi Kampuz</option>
                    <option value="dynamics">Mogi Dynamics</option>
                    <option value="studio">Mogi Studio</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input 
                    id="sortOrder" 
                    name="sortOrder"
                    type="number"
                    value={currentProduct?.sortOrder || 0} 
                    onChange={handleProductInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isActive" 
                  checked={currentProduct?.isActive || false}
                  onCheckedChange={(checked) => {
                    if (currentProduct) {
                      setCurrentProduct({
                        ...currentProduct,
                        isActive: checked
                      });
                    }
                  }}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <Button onClick={handleSaveProduct}>
                <Save className="mr-2 h-4 w-4" />
                Save Product
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      <Tabs defaultValue="blog">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="blog">Blog Management</TabsTrigger>
          <TabsTrigger value="product">Product Management</TabsTrigger>
        </TabsList>
        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              {blogs.length === 0 ? (
                <p>No blogs found. Create your first blog post.</p>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogs.map((blog) => (
                      <Card key={blog._id} className="overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">
                                {blog.title}
                                {blog.isShow ? (
                                  <Eye className="inline-block ml-2 h-4 w-4 text-green-500" />
                                ) : (
                                  <EyeOff className="inline-block ml-2 h-4 w-4 text-red-500" />
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground">{blog.slug}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditBlog(blog)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => blog._id && handleDeleteBlog(blog._id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              <Button onClick={handleNewBlog} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add New Blog
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="product">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your products</CardDescription>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <p>No products found. Create your first product.</p>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <Card key={product._id} className="overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">
                                {product.name}
                                {product.isActive ? (
                                  <Eye className="inline-block ml-2 h-4 w-4 text-green-500" />
                                ) : (
                                  <EyeOff className="inline-block ml-2 h-4 w-4 text-red-500" />
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => product._id && handleDeleteProduct(product._id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              <Button onClick={handleNewProduct} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
