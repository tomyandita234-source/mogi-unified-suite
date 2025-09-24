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
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("blog");
  const [blogImage, setBlogImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchBlogs();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/users/login`, loginData);
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setIsLoggedIn(true);
      toast({
        title: "Login berhasil",
        description: "Selamat datang di dashboard admin",
      });
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login gagal');
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: error.response?.data?.message || 'Email atau password salah',
      });
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
      
      toast({
        title: "Success",
        description: `Product ${currentProduct._id ? 'updated' : 'created'} successfully`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      
      await axios.delete(`${API_URL}/products/${id}`, config);
      fetchProducts();
      
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleActiveChange = (checked: boolean) => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        active: checked
      });
    }
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
      isShow: 1
    });
    setIsEditingBlog(true);
    setImagePreview(null);
  };

  const handleSaveBlog = async () => {
    if (!currentBlog) return;
    
    try {
      const formData = new FormData();
      formData.append('title', currentBlog.title);
      formData.append('slug', currentBlog.slug);
      formData.append('body', currentBlog.body);
      formData.append('isShow', currentBlog.isShow.toString());
      
      if (currentBlog.images_alt) {
        formData.append('images_alt', currentBlog.images_alt);
      }
      
      if (currentBlog.images_source) {
        formData.append('images_source', currentBlog.images_source);
      }
      
      if (currentBlog.source) {
        formData.append('source', currentBlog.source);
      }
      
      // Handle image upload if there's a new image
      if (blogImage) {
        formData.append('image', blogImage);
      } else if (currentBlog.image_base64 && currentBlog.image_base64.startsWith('data:')) {
        const base64Data = currentBlog.image_base64.split(',')[1];
        const blob = await (await fetch(`data:image/jpeg;base64,${base64Data}`)).blob();
        formData.append('image', blob, 'image.jpg');
      }
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      };

      if (currentBlog._id) {
        // Update existing blog
        await axios.put(`${API_URL}/blogs/${currentBlog._id}`, formData, config);
      } else {
        // Create new blog
        await axios.post(`${API_URL}/blogs`, formData, config);
      }
      
      fetchBlogs();
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
        description: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      
      await axios.delete(`${API_URL}/blogs/${id}`, config);
      fetchBlogs();
      
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || 'Something went wrong',
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
          image_base64: base64String
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBlogVisibilityChange = (checked: boolean) => {
    if (currentBlog) {
      setCurrentBlog({
        ...currentBlog,
        isShow: checked ? 1 : 0
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
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    placeholder="Enter your email" 
                    value={loginData.email}
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

  if (isEditing) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="outline" onClick={() => setIsEditing(false)} className="mb-4">
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
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={currentProduct?.name || ''} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input 
                    id="subtitle" 
                    name="subtitle"
                    value={currentProduct?.subtitle || ''} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={currentProduct?.description || ''} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="icon">Icon</Label>
                  <Input 
                    id="icon" 
                    name="icon"
                    value={currentProduct?.icon || ''} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="color">Color</Label>
                  <Input 
                    id="color" 
                    name="color"
                    value={currentProduct?.color || ''} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="active" 
                  checked={currentProduct?.active || false}
                  onCheckedChange={handleActiveChange}
                />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Features</Label>
                {currentProduct?.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input 
                      value={feature} 
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFeature(index)}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="images_alt">Image Alt Text</Label>
                  <Input 
                    id="images_alt" 
                    name="images_alt"
                    value={currentBlog?.images_alt || ''} 
                    onChange={handleBlogInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="images_source">Image Source</Label>
                  <Input 
                    id="images_source" 
                    name="images_source"
                    value={currentBlog?.images_source || ''} 
                    onChange={handleBlogInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="source">Source</Label>
                <Input 
                  id="source" 
                  name="source"
                  value={currentBlog?.source || ''} 
                  onChange={handleBlogInputChange}
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
                  checked={currentBlog?.isShow === 1}
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
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
                                {blog.isShow === 1 ? (
                                  <Eye className="inline-block ml-2 h-4 w-4 text-green-500" />
                                ) : (
                                  <EyeOff className="inline-block ml-2 h-4 w-4 text-red-500" />
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground">{blog.slug}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(blog.createdAt!).toLocaleDateString()}
                              </p>
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
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-center mt-4">
                <Button onClick={handleNewBlog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Blog
                </Button>
              </div>
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
                                {product.active ? (
                                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ml-2">
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
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <Button onClick={handleNewProduct}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;