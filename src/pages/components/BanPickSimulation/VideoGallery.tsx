import React from "react";

interface VideoGalleryProps {
  videos: string[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
  return (
    <div className="my-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {videos.map((url, idx) => {
          const videoId = url.split("v=")[1];
          return (
            <div key={idx} className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube video ${idx}`}
                className="w-full h-full rounded-lg shadow-lg"
                style={{ border: "none" }}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoGallery;
