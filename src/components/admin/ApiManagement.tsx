import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Play, Square, RefreshCw, Copy, Key, Globe, Shield, Zap, Plus, Trash2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ExternalAPI } from "@/lib/api"

const ApiManagement = () => {
	const { toast } = useToast()
	const [isAutoBlogEnabled, setIsAutoBlogEnabled] = useState(false)
	const [apiKey, setApiKey] = useState("sk_live_****************")
	const [hasApiKey, setHasApiKey] = useState(false)
	const [sources, setSources] = useState([
		{ id: 1, name: "TechCrunch RSS", url: "https://techcrunch.com/feed/", active: true },
		{ id: 2, name: "Mogi Blog", url: "https://mogiapp.com/blog/feed/", active: true },
	])
	const [loading, setLoading] = useState(false)
	const [generatingBlogs, setGeneratingBlogs] = useState(false)
	// Add state for statistics
	const [stats, setStats] = useState({
		activeSources: 0,
		generatedPosts: 0,
		successRate: 0,
	})

	useEffect(() => {
		fetchApiKeyInfo()
		// Update statistics
		updateStats()
	}, [])

	useEffect(() => {
		// Update statistics when sources change
		updateStats()
	}, [sources])

	const updateStats = () => {
		const activeSources = sources.filter((s) => s.active).length
		setStats({
			activeSources,
			generatedPosts: 0, // In a real implementation, this would come from the backend
			successRate: activeSources > 0 ? 98 : 0, // In a real implementation, this would come from the backend
		})
	}

	const fetchApiKeyInfo = async () => {
		try {
			const response = await ExternalAPI.getApiKeyInfo()
			setHasApiKey(response.user.hasApiKey)
		} catch (error) {
			console.error("Error fetching API key info:", error)
		}
	}

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text)
		toast({
			title: "Copied to clipboard",
			description: "API key copied to clipboard",
		})
	}

	const addSource = () => {
		const newSource = {
			id: sources.length + 1,
			name: "",
			url: "",
			active: true,
		}
		setSources([...sources, newSource])
	}

	const removeSource = (id: number) => {
		setSources(sources.filter((source) => source.id !== id))
	}

	const updateSource = (id: number, field: string, value: string | boolean) => {
		setSources(sources.map((source) => (source.id === id ? { ...source, [field]: value } : source)))
	}

	const generateApiKey = async () => {
		try {
			setLoading(true)
			const response = await ExternalAPI.generateApiKey()
			setApiKey(response.apiKey)
			setHasApiKey(true)
			toast({
				title: "API Key Generated",
				description: "Your new API key has been generated",
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Failed to generate API key",
			})
		} finally {
			setLoading(false)
		}
	}

	const revokeApiKey = async () => {
		try {
			setLoading(true)
			await ExternalAPI.revokeApiKey()
			setApiKey("sk_live_****************")
			setHasApiKey(false)
			toast({
				title: "API Key Revoked",
				description: "Your API key has been revoked",
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Failed to revoke API key",
			})
		} finally {
			setLoading(false)
		}
	}

	// Add this function for auto blog generation
	const generateBlogs = async () => {
		try {
			setGeneratingBlogs(true)
			const response = await ExternalAPI.generateBlogsFromRss(sources)
			toast({
				title: "Blog Generation Complete",
				description: `Generated ${response.results.successful} blog posts`,
			})
			// Update stats after generation
			setStats({
				...stats,
				generatedPosts: stats.generatedPosts + response.results.successful,
				successRate: response.results.successful > 0 ? 98 : stats.successRate,
			})
		} catch (error: any) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Failed to generate blog posts",
			})
		} finally {
			setGeneratingBlogs(false)
		}
	}

	return (
		<div className="space-y-6">
			{/* API Key Management */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Key className="h-5 w-5" />
						API Key Management
					</CardTitle>
					<CardDescription>Manage your API access keys</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col sm:flex-row gap-4 items-end">
						<div className="flex-1">
							<Label htmlFor="apiKey">API Key</Label>
							<div className="flex gap-2 mt-1">
								<Input id="apiKey" value={apiKey} readOnly className="font-mono" />
								<Button
									variant="outline"
									size="icon"
									onClick={() => copyToClipboard(apiKey)}
									disabled={!hasApiKey}
								>
									<Copy className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<div className="flex gap-2">
							{!hasApiKey ? (
								<Button onClick={generateApiKey} disabled={loading}>
									{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
									<Key className="h-4 w-4 mr-2" />
									Generate Key
								</Button>
							) : (
								<Button variant="destructive" onClick={revokeApiKey} disabled={loading}>
									{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
									<RefreshCw className="h-4 w-4 mr-2" />
									Revoke Key
								</Button>
							)}
						</div>
					</div>
					<p className="text-sm text-muted-foreground mt-2">
						Use this key to authenticate API requests. Keep it secret and secure.
					</p>
				</CardContent>
			</Card>

			{/* Auto Blog Generation */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Zap className="h-5 w-5" />
						Auto Blog Generation
					</CardTitle>
					<CardDescription>
						Automatically generate blog posts from RSS feeds and other sources
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="font-medium">Enable Auto Blog Generation</h3>
							<p className="text-sm text-muted-foreground">
								Automatically create blog posts from configured sources
							</p>
						</div>
						<Switch checked={isAutoBlogEnabled} onCheckedChange={setIsAutoBlogEnabled} />
					</div>

					{isAutoBlogEnabled && (
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<h4 className="font-medium">Content Sources</h4>
								<Button onClick={addSource} size="sm">
									<Plus className="h-4 w-4 mr-2" />
									Add Source
								</Button>
							</div>

							<div className="space-y-3">
								{sources.map((source) => (
									<div
										key={source.id}
										className="flex flex-col sm:flex-row gap-3 p-3 border rounded-lg"
									>
										<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
											<div>
												<Label htmlFor={`name-${source.id}`}>Source Name</Label>
												<Input
													id={`name-${source.id}`}
													value={source.name}
													onChange={(e) => updateSource(source.id, "name", e.target.value)}
													placeholder="e.g., TechCrunch RSS"
												/>
											</div>
											<div>
												<Label htmlFor={`url-${source.id}`}>URL</Label>
												<Input
													id={`url-${source.id}`}
													value={source.url}
													onChange={(e) => updateSource(source.id, "url", e.target.value)}
													placeholder="https://example.com/feed"
												/>
											</div>
										</div>
										<div className="flex items-end gap-2">
											<Switch
												checked={source.active}
												onCheckedChange={(checked) =>
													updateSource(source.id, "active", checked)
												}
											/>
											<Button
												variant="destructive"
												size="icon"
												onClick={() => removeSource(source.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								))}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
								<Card>
									<CardContent className="p-4 text-center">
										<Globe className="h-8 w-8 mx-auto text-blue-500 mb-2" />
										<p className="font-medium">{stats.activeSources} Sources</p>
										<p className="text-sm text-muted-foreground">Active feeds</p>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-4 text-center">
										<Zap className="h-8 w-8 mx-auto text-green-500 mb-2" />
										<p className="font-medium">{stats.generatedPosts} Posts</p>
										<p className="text-sm text-muted-foreground">Auto-generated</p>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-4 text-center">
										<Shield className="h-8 w-8 mx-auto text-purple-500 mb-2" />
										<p className="font-medium">{stats.successRate}%</p>
										<p className="text-sm text-muted-foreground">Success rate</p>
									</CardContent>
								</Card>
							</div>

							<div className="flex gap-3 pt-4">
								<Button onClick={generateBlogs} disabled={generatingBlogs}>
									{generatingBlogs && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
									<Play className="h-4 w-4 mr-2" />
									Generate Blogs
								</Button>
								<Button variant="outline">
									<RefreshCw className="h-4 w-4 mr-2" />
									Schedule
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* API Documentation */}
			<Card>
				<CardHeader>
					<CardTitle>API Documentation</CardTitle>
					<CardDescription>Learn how to use the MogiApp API</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div>
							<h3 className="font-medium mb-2">Base URL</h3>
							<code className="bg-muted p-2 rounded text-sm break-all">
								{import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/external
							</code>
						</div>

						<div>
							<h3 className="font-medium mb-2">Authentication</h3>
							<p className="text-sm text-muted-foreground">
								Include your API key in the Authorization header:
							</p>
							<code className="bg-muted p-2 rounded text-sm block mt-1">
								Authorization: Bearer YOUR_API_KEY
							</code>
						</div>

						<div>
							<h3 className="font-medium mb-2">Example Request</h3>
							<pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
								{`curl -X GET "${
									import.meta.env.VITE_API_URL || "http://localhost:5000"
								}/api/external/blogs" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
							</pre>
						</div>

						<Button>View Full Documentation</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default ApiManagement
