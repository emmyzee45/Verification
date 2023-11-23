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
            <h2 className='site-map-h1'>LEARN MORE ABOUT SIMVER SERVICES</h2>
            <h3 className='site-map-h2'>
              Browse through our collection of videos to 
              learn more about SIMVER subscriptions, how to purchase and receive messages
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
            <p className='video-desc'>HOW TO MAKE SUBSCRIPTIONS ON SIMVER</p>
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
              url="https://youtu.be/MYBUZUL45Bc" 
            />
            <p className='video-desc'>HOW TO RE-ROUTE SIMVER NUMBER TO MAKE CALLS</p>
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
              url="https://youtu.be/0iqwMp5gLq0" 
            />
            <p className='video-desc'>HOW TO CHECK SIMVER NUMBER CARRIER PROVIDER</p>
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
              url="https://youtu.be/3kHIGww-zyA" 
            />
            <p className='video-desc'>HOW TO CALL FROM SIMVER NUMBER TO ANY LINE</p>
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
            <p className='video-desc'>HOW TO MAKE SUBSCRIPTIONS ON SIMVER</p>
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
              url="https://youtu.be/MYBUZUL45Bc" 
            />
            <p className='video-desc'>HOW TO RE-ROUTE SIMVER NUMBER TO MAKE CALLS</p>
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
              url="https://youtu.be/0iqwMp5gLq0" 
              />
              <p className='video-desc'>HOW TO CHECK SIMVER NUMBER CARRIER PROVIDER</p>
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
              url="https://youtu.be/3kHIGww-zyA" 
            />
            <p className='video-desc'>HOW TO CALL FROM SIMVER NUMBER TO ANY LINE</p>
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
            <p className='video-desc'>HOW TO MAKE SUBSCRIPTIONS ON SIMVER</p>
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
              url="https://youtu.be/MYBUZUL45Bc" 
              />
              <p className='video-desc'>HOW TO RE-ROUTE SIMVER NUMBER TO MAKE CALLS</p>
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
              url="https://youtu.be/0iqwMp5gLq0" 
              />
              <p className='video-desc'>HOW TO CHECK SIMVER NUMBER CARRIER PROVIDER</p>
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
              url="https://youtu.be/3kHIGww-zyA" 
              />
              <p className='video-desc'>HOW TO CALL FROM SIMVER NUMBER TO ANY LINE</p>
          </div>
        </div>
        <div className="site-map-fourth-container">
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={300}
              height={180}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/QNrf723Y9ZU" 
            />
            <p className='video-desc'>HOW TO MAKE SUBSCRIPTIONS ON SIMVER</p>
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={300}
              height={180}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/MYBUZUL45Bc" 
              />
              <p className='video-desc'>HOW TO RE-ROUTE SIMVER NUMBER TO MAKE CALLS</p>
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={300}
              height={180}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/0iqwMp5gLq0" 
              />
              <p className='video-desc'>HOW TO CHECK SIMVER NUMBER CARRIER PROVIDER</p>
          </div>
          <div className="site-map-item">
            <ReactPlayer 
              className="site-map-item1" 
              controls={true} 
              light={true} 
              playing={true} 
              width={300}
              height={180}
              playIcon={<VideoIcon />} 
              url="https://youtu.be/3kHIGww-zyA" 
              />
              <p className='video-desc'>HOW TO CALL FROM SIMVER NUMBER TO ANY LINE</p>
          </div>
        </div>
    </div>
  );
}
