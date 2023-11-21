import React from 'react';
import ReactPlayer from "react-player";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrow';
import "./sitemap.css"

export default function Sitemap() {
  const VideoIcon = () => {
    return (
      <div className='video-icon'>
        <PlayArrowOutlinedIcon className='player-icon' />
      </div>
    )
  }
  return (
    <div className='site-map-features'>
          <div className="site-map-header">
            <h2 className='site-map-h1'>Learn more about SIMVER subscriptions</h2>
            <h3 className='site-map-h2'>
              Browse through our collection of videos to 
              learn more about SIMVER subscriptions, and how to purchase and receive messages
            </h3>
            </div>
        <div className="site-map-container">
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={600}
              height={320}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={600}
              height={320}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={600}
              height={320}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={600}
              height={320}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
        </div>
        <div className="site-map-second-container">
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={450}
              height={280}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={450}
              height={280}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={450}
              height={280}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={450}
              height={280}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
        </div>
        <div className="site-map-third-container">
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={350}
              height={200}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={350}
              height={200}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={350}
              height={200}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={350}
              height={200}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
          </div>
        </div>
    </div>
  );
}
