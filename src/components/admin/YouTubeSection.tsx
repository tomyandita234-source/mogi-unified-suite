import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface YouTubeVideo {
	id: string
	title: string
	url: string
	type: "video" | "short"
	description?: string
}

const YouTubeSection = () => {
	const { toast } = useToast()
	const [videos, setVideos] = useState<YouTubeVideo[]>([
		// Sample data - in a real app, this would come from an API
		{
			id: "1",
			title: "Mogi POS Introduction",
			url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			type: "video",
			description: "Learn how to use Mogi POS system",
		},
		{
			id: "2",
			title: "MogiPay Quick Tutorial",
			url: "https://www.youtube.com/shorts/abcdefg",
			type: "short",
			description: "Quick setup guide for MogiPay",
		},
	])
	const [newVideo, setNewVideo] = useState<Omit<YouTubeVideo, "id">>({
		title: "",
		url: "",
		type: "video",
		description: "",
	})
	const [editingId, setEditingId] = useState<string | null>(null)
	const [editingVideo, setEditingVideo] = useState<YouTubeVideo | null>(null)

	// Extract YouTube video ID from URL
	const extractVideoId = (url: string): string | null => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
		const match = url.match(regExp)
		return match && match[2].length === 11 ? match[2] : null
	}

	// Get YouTube thumbnail URL
	const getThumbnailUrl = (url: string): string => {
		const videoId = extractVideoId(url)
		return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : ""
	}

	const handleAddVideo = () => {
		if (!newVideo.title || !newVideo.url) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Title and URL are required",
			})
			return
		}

		const videoId = extractVideoId(newVideo.url)
		if (!videoId) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Invalid YouTube URL",
			})
			return
		}

		const video: YouTubeVideo = {
			...newVideo,
			id: Date.now().toString(),
		}

		setVideos([...videos, video])
		setNewVideo({
			title: "",
			url: "",
			type: "video",
			description: "",
		})

		toast({
			title: "Success",
			description: "Video added successfully",
		})
	}

	const handleEditVideo = (video: YouTubeVideo) => {
		setEditingId(video.id)
		setEditingVideo({ ...video })
	}

	const handleSaveEdit = () => {
		if (!editingVideo) return

		if (!editingVideo.title || !editingVideo.url) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Title and URL are required",
			})
			return
		}

		const videoId = extractVideoId(editingVideo.url)
		if (!videoId) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Invalid YouTube URL",
			})
			return
		}

		setVideos(videos.map((v) => (v.id === editingId ? editingVideo : v)))
		setEditingId(null)
		setEditingVideo(null)

		toast({
			title: "Success",
			description: "Video updated successfully",
		})
	}

	const handleDeleteVideo = (id: string) => {
		if (!window.confirm("Are you sure you want to delete this video?")) return
		setVideos(videos.filter((video) => video.id !== id))
		toast({
			title: "Success",
			description: "Video deleted successfully",
		})
	}

	const handleCancelEdit = () => {
		setEditingId(null)
		setEditingVideo(null)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>YouTube Videos</CardTitle>
				<CardDescription>Manage Mogi YouTube videos and shorts</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Add new video form */}
				<div className="mb-6 p-4 border rounded-lg">
					<h3 className="font-medium mb-3">Add New Video</h3>
					<div className="grid gap-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="newTitle">Title</Label>
								<Input
									id="newTitle"
									value={newVideo.title}
									onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
									placeholder="Enter video title"
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="newUrl">YouTube URL</Label>
								<Input
									id="newUrl"
									value={newVideo.url}
									onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
									placeholder="https://youtube.com/watch?v=..."
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="newType">Type</Label>
								<select
									id="newType"
									value={newVideo.type}
									onChange={(e) =>
										setNewVideo({ ...newVideo, type: e.target.value as "video" | "short" })
									}
									className="border border-input bg-background rounded-md p-2"
								>
									<option value="video">Video</option>
									<option value="short">Short</option>
								</select>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="newDescription">Description</Label>
								<Textarea
									id="newDescription"
									value={newVideo.description || ""}
									onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
									placeholder="Enter video description"
								/>
							</div>
						</div>
						<Button onClick={handleAddVideo} className="w-full md:w-auto">
							<Plus className="mr-2 h-4 w-4" />
							Add Video
						</Button>
					</div>
				</div>

				{/* Video list */}
				<div className="space-y-4">
					{videos.length === 0 ? (
						<p>No videos found. Add your first video.</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{videos.map((video) => (
								<Card key={video.id} className="overflow-hidden">
									{editingId === video.id && editingVideo ? (
										// Edit mode
										<div className="p-4">
											<div className="flex flex-col space-y-3">
												<Input
													value={editingVideo.title}
													onChange={(e) =>
														setEditingVideo({ ...editingVideo, title: e.target.value })
													}
													placeholder="Video title"
												/>
												<Input
													value={editingVideo.url}
													onChange={(e) =>
														setEditingVideo({ ...editingVideo, url: e.target.value })
													}
													placeholder="YouTube URL"
												/>
												<select
													value={editingVideo.type}
													onChange={(e) =>
														setEditingVideo({
															...editingVideo,
															type: e.target.value as "video" | "short",
														})
													}
													className="border border-input bg-background rounded-md p-2"
												>
													<option value="video">Video</option>
													<option value="short">Short</option>
												</select>
												<Textarea
													value={editingVideo.description || ""}
													onChange={(e) =>
														setEditingVideo({
															...editingVideo,
															description: e.target.value,
														})
													}
													placeholder="Description"
												/>
												<div className="flex gap-2">
													<Button onClick={handleSaveEdit} size="sm" className="flex-1">
														Save
													</Button>
													<Button
														onClick={handleCancelEdit}
														variant="outline"
														size="sm"
														className="flex-1"
													>
														Cancel
													</Button>
												</div>
											</div>
										</div>
									) : (
										// View mode
										<>
											<div className="relative">
												{video.url && (
													<img
														src={getThumbnailUrl(video.url)}
														alt={video.title}
														className="w-full h-40 object-cover"
													/>
												)}
												<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
													<Play className="h-8 w-8 text-white" />
												</div>
												<div className="absolute top-2 right-2">
													<span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
														{video.type === "short" ? "SHORT" : "VIDEO"}
													</span>
												</div>
											</div>
											<div className="p-4">
												<h3 className="font-medium mb-1">{video.title}</h3>
												{video.description && (
													<p className="text-sm text-muted-foreground mb-3">
														{video.description}
													</p>
												)}
												<div className="flex justify-between items-center">
													<a
														href={video.url}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm text-primary hover:underline"
													>
														Watch on YouTube
													</a>
													<div className="flex gap-2">
														<Button
															variant="ghost"
															size="icon"
															onClick={() => handleEditVideo(video)}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
															>
																<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
															</svg>
														</Button>
														<Button
															variant="ghost"
															size="icon"
															onClick={() => handleDeleteVideo(video.id)}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</div>
											</div>
										</>
									)}
								</Card>
							))}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default YouTubeSection
