import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit, Save, Image, Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";

const API_URL = 'http://localhost:5000/api';

interface Product {
  _id?: string;
  id: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  logoPath?: string;
  active: boolean;
}

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  body: string;
  image?: string;
  image_base64?: string;
  images_alt?: string;
  images_source?: string;
  isShow: number;
  createdBy?: string;
  source?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("blog");

  useEffect(() => {
    fetchProducts();
    fetchBlogs();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };
  
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs`);
      setBlogs(response.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/users/login`, loginData);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setIsLoggedIn(true);
      setError('');
      toast({
        title: "Login berhasil",
        description: "Selamat datang di panel admin",
      });
    } catch (error) {
      setError('Login gagal. Periksa username dan password Anda.');
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        [name]: value
      });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (currentProduct) {
      const updatedFeatures = [...currentProduct.features];
      updatedFeatures[index] = value;
      setCurrentProduct({
        ...currentProduct,
        features: updatedFeatures
      });
    }
  };

  const addFeature = () => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        features: [...currentProduct.features, '']
      });
    }
  };

  const removeFeature = (index: number) => {
    if (currentProduct) {
      const updatedFeatures = [...currentProduct.features];
      updatedFeatures.splice(index, 1);
      setCurrentProduct({
        ...currentProduct,
        features: updatedFeatures
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleNewProduct = () => {
    setCurrentProduct({
      id: '',
      name: '',
      subtitle: '',
      description: '',
      features: [''],
      icon: 'ShoppingCart',
      color: 'from-blue-500 to-indigo-500',
      active: true
    });
    setIsEditing(true);
  };

  const handleSaveProduct = async () => {
    if (!currentProduct) return;
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      if (currentProduct._id) {
        // Update existing product
        await axios.put(`${API_URL}/products/${currentProduct._id}`, currentProduct, config);
        toast({
          title: "Produk diperbarui",
          description: `${currentProduct.name} berhasil diperbarui`,
        });
      } else {
        // Create new product
        await axios.post(`${API_URL}/products`, currentProduct, config);
        toast({
          title: "Produk ditambahkan",
          description: `${currentProduct.name} berhasil ditambahkan`,
        });
      }
      
      fetchProducts();
      setIsEditing(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Gagal menyimpan produk",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      await axios.delete(`${API_URL}/products/${id}`, config);
      fetchProducts();
      toast({
        title: "Produk dihapus",
        description: "Produk berhasil dihapus dari sistem",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Gagal menghapus produk",
        description: "Terjadi kesalahan saat menghapus data",
        variant: "destructive"
      });
    }
  };
  
  // Blog management functions
  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentBlog) {
      setCurrentBlog({
        ...currentBlog,
        [name]: value
      });
    }
  };

  const handleBlogVisibilityChange = (checked: boolean) => {
    if (currentBlog) {
      setCurrentBlog({
        ...currentBlog,
        isShow: checked ? 1 : 0
      });
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      if (currentBlog) {
        setCurrentBlog({
          ...currentBlog,
          image_base64: base64String
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditingBlog(true);
    setImagePreview(blog.image ? `${API_URL}${blog.image}` : null);
  };
  
  const handleNewBlog = () => {
    setCurrentBlog({
      title: '',
      slug: '',
      body: '',
      isShow: 1,
      createdBy: 'Admin',
      images_alt: '',
      images_source: '',
      source: ''
    });
    setIsEditingBlog(true);
    setImagePreview(null);
  };
  
  const handleSaveBlog = async () => {
    if (!currentBlog) return;
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', currentBlog.title);
      formData.append('slug', currentBlog.slug || createSlug(currentBlog.title));
      formData.append('body', currentBlog.body);
      formData.append('isShow', currentBlog.isShow.toString());
      
      if (currentBlog.createdBy) formData.append('createdBy', currentBlog.createdBy);
      if (currentBlog.images_alt) formData.append('images_alt', currentBlog.images_alt);
      if (currentBlog.images_source) formData.append('images_source', currentBlog.images_source);
      if (currentBlog.source) formData.append('source', currentBlog.source);
      
      // Get file from image preview if it's a base64 string
      if (imagePreview && imagePreview.startsWith('data:')) {
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        formData.append('image', blob, 'image.jpg');
      }
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      };
      
      if (currentBlog._id) {
        // Update existing blog
        await axios.put(`${API_URL}/blogs/${currentBlog._id}`, formData, config);
        toast({
          title: "Blog diperbarui",
          description: `Artikel "${currentBlog.title}" berhasil diperbarui`,
        });
      } else {
        // Create new blog
        await axios.post(`${API_URL}/blogs`, formData, config);
        toast({
          title: "Blog ditambahkan",
          description: `Artikel "${currentBlog.title}" berhasil ditambahkan`,
        });
      }
      
      fetchBlogs();
      setIsEditingBlog(false);
      setCurrentBlog(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving blog:', error);
      toast({
        title: "Gagal menyimpan blog",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
    
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      await axios.delete(`${API_URL}/blogs/${id}`, config);
      fetchBlogs();
      toast({
        title: "Blog dihapus",
        description: "Artikel berhasil dihapus dari sistem",
      });
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: "Gagal menghapus blog",
        description: "Terjadi kesalahan saat menghapus data",
        variant: "destructive"
      });
    }
  };

  // Helper function to create slug from title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login Admin</CardTitle>
            <CardDescription>Masuk untuk mengelola produk dan konten</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  name="username" 
                  value={loginData.username} 
                  onChange={handleLoginInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={loginData.password} 
                  onChange={handleLoginInputChange} 
                  required 
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="blog">Blog Management</TabsTrigger>
          <TabsTrigger value="product">Product Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blog" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Blog Articles</CardTitle>
                <Button onClick={handleNewBlog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Blog
                </Button>
              </div>
              <CardDescription>Manage your blog articles here</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditingBlog ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={currentBlog?.title || ''} 
                      onChange={handleBlogInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input 
                      id="slug" 
                      name="slug" 
                      value={currentBlog?.slug || ''} 
                      onChange={handleBlogInputChange} 
                      placeholder="auto-generated-if-empty"
                    />
                    <p className="text-xs text-muted-foreground">Leave empty to auto-generate from title</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="body">Content</Label>
                    <Textarea 
                      id="body" 
                      name="body" 
                      value={currentBlog?.body || ''} 
                      onChange={handleBlogInputChange} 
                      className="min-h-[200px]"
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Featured Image</Label>
                    <div className="flex items-center gap-4">
                      <Input 
                        id="image" 
                        name="image" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                      />
                      {imagePreview && (
                        <div className="relative w-20 h-20">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded-md" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="images_alt">Image Alt Text</Label>
                    <Input 
                      id="images_alt" 
                      name="images_alt" 
                      value={currentBlog?.images_alt || ''} 
                      onChange={handleBlogInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="images_source">Image Source</Label>
                    <Input 
                      id="images_source" 
                      name="images_source" 
                      value={currentBlog?.images_source || ''} 
                      onChange={handleBlogInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="createdBy">Author</Label>
                    <Input 
                      id="createdBy" 
                      name="createdBy" 
                      value={currentBlog?.createdBy || ''} 
                      onChange={handleBlogInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="source">Source</Label>
                    <Input 
                      id="source" 
                      name="source" 
                      value={currentBlog?.source || ''} 
                      onChange={handleBlogInputChange} 
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="isShow" 
                      checked={currentBlog?.isShow === 1} 
                      onCheckedChange={handleBlogVisibilityChange} 
                    />
                    <Label htmlFor="isShow">Publish Article</Label>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => {
                      setIsEditingBlog(false);
                      setCurrentBlog(null);
                      setImagePreview(null);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveBlog}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Blog
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {blogs.length === 0 ? (
                    <p className="text-center py-4">No blog articles found.</p>
                  ) : (
                    <div className="grid gap-4">
                      {blogs.map((blog) => (
                        <Card key={blog._id} className="overflow-hidden">
                          <div className="p-4 flex justify-between items-start">
                            <div className="flex gap-4">
                              {blog.image && (
                                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                  <img 
                                    src={`${API_URL}${blog.image}`} 
                                    alt={blog.images_alt || blog.title} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                              )}
                              <div>
                                <h3 className="font-semibold flex items-center gap-2">
                                  {blog.title}
                                  {blog.isShow === 1 ? (
                                    <Eye className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  )}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {blog.body}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  By {blog.createdBy || 'Unknown'} • {new Date(blog.createdAt || '').toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditBlog(blog)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteBlog(blog._id!)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-center">
                    <Button onClick={handleNewBlog}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Blog
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="product" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Products</CardTitle>
                <Button onClick={handleNewProduct}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </div>
              <CardDescription>Manage your products here</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">Product ID</Label>
                    <Input 
                      id="id" 
                      name="id" 
                      value={currentProduct?.id || ''} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={currentProduct?.name || ''} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input 
                      id="subtitle" 
                      name="subtitle" 
                      value={currentProduct?.subtitle || ''} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={currentProduct?.description || ''} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Input 
                      id="icon" 
                      name="icon" 
                      value={currentProduct?.icon || ''} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="color">Color Gradient</Label>
                    <Input 
                      id="color" 
                      name="color" 
                      value={currentProduct?.color || ''} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Features</Label>
                    {currentProduct?.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input 
                          value={feature} 
                          onChange={(e) => handleFeatureChange(index, e.target.value)} 
                          required 
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFeature(index)}
                          disabled={currentProduct.features.length <= 1}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addFeature}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Feature
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="active" 
                      checked={currentProduct?.active} 
                      onCheckedChange={(checked) => {
                        if (currentProduct) {
                          setCurrentProduct({
                            ...currentProduct,
                            active: checked
                          });
                        }
                      }} 
                    />
                    <Label htmlFor="active">Active Product</Label>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => {
                      setIsEditing(false);
                      setCurrentProduct(null);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProduct}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Product
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <p className="text-center py-4">No products found.</p>
                  ) : (
                    <div className="grid gap-4">
                      {products.map((product) => (
                        <Card key={product._id || product.id} className="overflow-hidden">
                          <div className="p-4 flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold flex items-center gap-2">
                                {product.name}
                                {product.active ? (
                                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    Active
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                                    Inactive
                                  </span>
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {product.features.length} features
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product._id!)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-center">
                    <Button onClick={handleNewProduct}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Product
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
  const handleFeatureChange = (index: number, value: string) => {
    if (currentProduct) {
      const updatedFeatures = [...currentProduct.features];
      updatedFeatures[index] = value;
      setCurrentProduct({
        ...currentProduct,
        features: updatedFeatures
      });
    }
  };
  const addFeature = () => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        features: [...currentProduct.features, '']
      });
    }
  };

  const removeFeature = (index: number) => {
    if (currentProduct) {
      const updatedFeatures = [...currentProduct.features];
      updatedFeatures.splice(index, 1);
      setCurrentProduct({
        ...currentProduct,
        features: updatedFeatures
      });
    }
  };
        features: updatedFeatures
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleNewProduct = () => {
    setCurrentProduct({
      id: '',
      name: '',
      subtitle: '',
      description: '',
      features: [''],
      icon: 'ShoppingCart',
      color: 'from-blue-500 to-indigo-500',
      active: true
    });
    setIsEditing(true);
  };

  const handleSaveProduct = async () => {
    if (!currentProduct) return;
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };

      if (currentProduct._id) {
        // Update existing product
        await axios.put(`${API_URL}/products/${currentProduct.id}`, currentProduct, config);
      } else {
        // Create new product
        await axios.post(`${API_URL}/products`, currentProduct, config);
      }
      
      fetchProducts();
      setIsEditing(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      
      await axios.delete(`${API_URL}/products/${id}`, config);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  // Blog management functions
  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentBlog) {
      setCurrentBlog({
        ...currentBlog,
        [name]: value
      });
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      if (currentBlog) {
        setCurrentBlog({
          ...currentBlog,
          image_base64: base64String
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditingBlog(true);
    setImagePreview(blog.image ? `http://localhost:5000${blog.image}` : null);
  };
  
  const handleNewBlog = () => {
    setCurrentBlog({
      title: '',
      slug: '',
      body: '',
      isShow: 1,
      createdBy: 'AI Morfotech',
      images_alt: 'AI Morfo',
      images_source: 'Morfogenesis Teknologi Indonesia Creative Team',
      source: 'Morfogenesis Teknologi Indonesia AI Team'
    });
    setIsEditingBlog(true);
    setImagePreview(null);
  };
  
  const handleSaveBlog = async () => {
    if (!currentBlog) return;
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      
      if (currentBlog._id) {
        // Update existing blog
        await axios.put(`${API_URL}/blogs/${currentBlog._id}`, currentBlog, config);
      } else {
        // Create new blog
        await axios.post(`${API_URL}/blogs`, currentBlog, config);
      }
      
      fetchBlogs();
      setIsEditingBlog(false);
      setCurrentBlog(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };
  
  const handleDeleteBlog = async (id: string) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      
      await axios.delete(`${API_URL}/blogs/${id}`, config);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login Admin</CardTitle>
            <CardDescription>Masuk untuk mengelola produk dan konten</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <input
                  id="password"
                  type="password"
                  className="w-full p-2 border rounded-md"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Produk</TabsTrigger>
          <TabsTrigger value="blogs">Blog</TabsTrigger>
          <TabsTrigger value="users">Pengguna</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>{currentProduct?._id ? 'Edit Produk' : 'Produk Baru'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="id" className="text-sm font-medium">ID</label>
                      <input
                        id="id"
                        name="id"
                        className="w-full p-2 border rounded-md"
                        value={currentProduct?.id || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Nama</label>
                      <input
                        id="name"
                        name="name"
                        className="w-full p-2 border rounded-md"
                        value={currentProduct?.name || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subtitle" className="text-sm font-medium">Subtitle</label>
                    <input
                      id="subtitle"
                      name="subtitle"
                      className="w-full p-2 border rounded-md"
                      value={currentProduct?.subtitle || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Deskripsi</label>
                    <textarea
                      id="description"
                      name="description"
                      className="w-full p-2 border rounded-md"
                      rows={4}
                      value={currentProduct?.description || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fitur</label>
                    {currentProduct?.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          className="flex-1 p-2 border rounded-md"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                        />
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => removeFeature(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addFeature}>
                      <Plus className="h-4 w-4 mr-2" /> Tambah Fitur
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="icon" className="text-sm font-medium">Icon</label>
                      <input
                        id="icon"
                        name="icon"
                        className="w-full p-2 border rounded-md"
                        value={currentProduct?.icon || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="color" className="text-sm font-medium">Color</label>
                      <input
                        id="color"
                        name="color"
                        className="w-full p-2 border rounded-md"
                        value={currentProduct?.color || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Batal</Button>
                    <Button onClick={handleSaveProduct}>
                      <Save className="h-4 w-4 mr-2" /> Simpan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <Button onClick={handleNewProduct}>
                  <Plus className="h-4 w-4 mr-2" /> Produk Baru
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4 mr-2" /> Hapus
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="blogs">
          {isEditingBlog ? (
            <Card>
              <CardHeader>
                <CardTitle>{currentBlog?._id ? 'Edit Blog' : 'Blog Baru'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">Judul</label>
                      <input
                        id="title"
                        name="title"
                        className="w-full p-2 border rounded-md"
                        value={currentBlog?.title || ''}
                        onChange={handleBlogInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="slug" className="text-sm font-medium">Slug URL</label>
                      <input
                        id="slug"
                        name="slug"
                        className="w-full p-2 border rounded-md"
                        value={currentBlog?.slug || ''}
                        onChange={handleBlogInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="body" className="text-sm font-medium">Konten Blog</label>
                    <textarea
                      id="body"
                      name="body"
                      className="w-full p-2 border rounded-md"
                      rows={10}
                      value={currentBlog?.body || ''}
                      onChange={handleBlogInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium">Gambar</label>
                    <div className="flex items-center gap-4">
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="flex-1"
                        onChange={handleImageChange}
                      />
                      {imagePreview && (
                        <div className="w-24 h-24 relative">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="images_alt" className="text-sm font-medium">Alt Text Gambar</label>
                      <input
                        id="images_alt"
                        name="images_alt"
                        className="w-full p-2 border rounded-md"
                        value={currentBlog?.images_alt || 'AI Morfo'}
                        onChange={handleBlogInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="images_source" className="text-sm font-medium">Sumber Gambar</label>
                      <input
                        id="images_source"
                        name="images_source"
                        className="w-full p-2 border rounded-md"
                        value={currentBlog?.images_source || 'Morfogenesis Teknologi Indonesia Creative Team'}
                        onChange={handleBlogInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="createdBy" className="text-sm font-medium">Penulis</label>
                      <input
                        id="createdBy"
                        name="createdBy"
                        className="w-full p-2 border rounded-md"
                        value={currentBlog?.createdBy || 'AI Morfotech'}
                        onChange={handleBlogInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="source" className="text-sm font-medium">Sumber</label>
                      <input
                        id="source"
                        name="source"
                        className="w-full p-2 border rounded-md"
                        value={currentBlog?.source || 'Morfogenesis Teknologi Indonesia AI Team'}
                        onChange={handleBlogInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="isShow" className="text-sm font-medium">Status Publikasi</label>
                    <select
                      id="isShow"
                      name="isShow"
                      className="w-full p-2 border rounded-md"
                      value={currentBlog?.isShow}
                      onChange={(e) => handleBlogInputChange({
                        target: {
                          name: 'isShow',
                          value: parseInt(e.target.value)
                        }
                      } as React.ChangeEvent<HTMLSelectElement>)}
                    >
                      <option value={1}>Publikasikan</option>
                      <option value={0}>Draft</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditingBlog(false)}>Batal</Button>
                    <Button onClick={handleSaveBlog}>
                      <Save className="h-4 w-4 mr-2" /> Simpan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <Button onClick={handleNewBlog}>
                  <Plus className="h-4 w-4 mr-2" /> Blog Baru
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <Card key={blog._id}>
                    <CardHeader>
                      <CardTitle>{blog.title}</CardTitle>
                      <CardDescription>/{blog.slug}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {blog.image && (
                        <div className="w-full h-40 mb-4 overflow-hidden rounded-md">
                          <img 
                            src={`http://localhost:5000${blog.image}`} 
                            alt={blog.images_alt} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground mb-4">
                        {blog.body.length > 100 ? `${blog.body.substring(0, 100)}...` : blog.body}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${blog.isShow ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {blog.isShow ? 'Dipublikasikan' : 'Draft'}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditBlog(blog)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteBlog(blog._id as string)}>
                            <Trash2 className="h-4 w-4 mr-2" /> Hapus
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Pengguna</CardTitle>
              <CardDescription>Kelola pengguna dan hak akses</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Fitur manajemen pengguna akan segera hadir.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Sistem</CardTitle>
              <CardDescription>Konfigurasi pengaturan aplikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Fitur pengaturan sistem akan segera hadir.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;