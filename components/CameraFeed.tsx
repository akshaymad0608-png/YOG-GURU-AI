import React, { useRef, useEffect, useState } from 'react';
import { Camera as LucideCamera, CameraOff, Maximize, Settings } from 'lucide-react';

declare var Pose: any;
declare var drawConnectors: any;
declare var drawLandmarks: any;
declare var POSE_CONNECTIONS: any;

interface CameraFeedProps {
  onSkeletonUpdate?: (angles: Record<string, number>) => void;
  isActive: boolean;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ onSkeletonUpdate, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isMirror, setIsMirror] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const poseRef = useRef<any>(null);
  
  // Use a ref for the callback to avoid stale closure in MediaPipe onResults
  const onSkeletonUpdateRef = useRef(onSkeletonUpdate);

  useEffect(() => {
    onSkeletonUpdateRef.current = onSkeletonUpdate;
  }, [onSkeletonUpdate]);

  useEffect(() => {
    if (!isActive) {
      if (poseRef.current) {
        poseRef.current.close();
        poseRef.current = null;
      }
      return;
    }

    const initMediaPipe = async () => {
      try {
        if (typeof Pose === 'undefined') {
          console.error("MediaPipe Pose script not loaded");
          return;
        }

        const pose = new Pose({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
          }
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        const onResultsInternal = (results: any) => {
          if (!canvasRef.current || !results.poseLandmarks) return;

          const ctx = canvasRef.current.getContext('2d');
          if (!ctx) return;

          ctx.save();
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

          // Draw skeleton connectors
          if (typeof drawConnectors !== 'undefined') {
            drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
              color: '#10b981',
              lineWidth: 4
            });
          }

          // Draw landmarks
          if (typeof drawLandmarks !== 'undefined') {
            drawLandmarks(ctx, results.poseLandmarks, {
              color: '#ffffff',
              fillColor: '#10b981',
              lineWidth: 2,
              radius: 4
            });
          }

          ctx.restore();

          const landmarks = results.poseLandmarks;
          // Indice mapping: 14: right_elbow, 12: right_shoulder, 24: right_hip, 26: right_knee, 28: right_ankle
          if (landmarks[14] && landmarks[12] && landmarks[24] && landmarks[26] && landmarks[28]) {
            const calculateAngle = (a: any, b: any, c: any) => {
              const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
              let angle = Math.abs((radians * 180.0) / Math.PI);
              if (angle > 180.0) angle = 360 - angle;
              return angle;
            };

            const angles = {
              shoulder: calculateAngle(landmarks[14], landmarks[12], landmarks[24]),
              hip: calculateAngle(landmarks[12], landmarks[24], landmarks[26]),
              knee: calculateAngle(landmarks[24], landmarks[26], landmarks[28]),
            };
            
            // Call the ref instead of the prop directly to avoid stale closures
            onSkeletonUpdateRef.current?.(angles);
          }
        };

        pose.onResults(onResultsInternal);
        poseRef.current = pose;

        if (videoRef.current) {
          const camera = new (window as any).Camera(videoRef.current, {
            onFrame: async () => {
              if (poseRef.current) {
                await poseRef.current.send({ image: videoRef.current });
              }
            },
            width: 640,
            height: 480
          });
          camera.start();
          setHasPermission(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("MediaPipe initialization error:", err);
        setHasPermission(false);
        setIsLoading(false);
      }
    };

    initMediaPipe();

    return () => {
      if (poseRef.current) {
        poseRef.current.close();
        poseRef.current = null;
      }
    };
  }, [isActive]);

  return (
    <div className="relative group rounded-3xl overflow-hidden bg-slate-900 aspect-[4/3] shadow-2xl ring-1 ring-slate-800">
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-slate-400">
          <CameraOff size={48} className="mb-4 opacity-20" />
          <p className="text-sm font-medium">Trainer Session Inactive</p>
        </div>
      )}

      {isActive && isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-white z-10">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium animate-pulse">Initializing AI Vision...</p>
        </div>
      )}

      {isActive && hasPermission === false && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 px-8 text-center">
          <CameraOff size={48} className="mb-4" />
          <p className="font-bold mb-2">Camera Access Denied</p>
          <p className="text-sm opacity-80">Please enable camera permissions to start your AI training session.</p>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-opacity duration-500 ${isMirror ? 'scale-x-[-1]' : ''} ${hasPermission ? 'opacity-100' : 'opacity-0'}`}
      />
      
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${isMirror ? 'scale-x-[-1]' : ''} ${hasPermission ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIsMirror(!isMirror)}
          className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20"
          title="Mirror Mode"
        >
          <Maximize size={20} />
        </button>
        <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20">
          <Settings size={20} />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-[10px] uppercase tracking-widest font-bold text-white">Live Tracking</span>
      </div>
    </div>
  );
};

export default CameraFeed;