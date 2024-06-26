import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import ShimmerHome from "./ShimmerHome";
import SuggestedVideoCard from "./SuggestedVideoCard";

const VideoSuggestions = ({ videoId, videoTitle }) => {
  const searchVideoByKeyword = async (searchText) => {
    
    const response = await fetch(BASE_URL);
    const data = await response.json();
    if (!response.ok) {
      console.log(data.error);
      throw new Error(data.error.message);
    }
    return data.items;
  };
  const getSuggestedVideos = async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    if (!response.ok) {
      console.log(data.error);
      return searchVideoByKeyword(videoTitle);
    }
    return data.items;
  };

  const {
    data: suggestedVideos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["watch-page", "video-suggestions", videoId],
    queryFn: () => getSuggestedVideos(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
    onError: (error) => console.error(`Something went wrong : ${error}`),
  });

  if (isError) return "An error occurred loading suggested videos";

  return isLoading ? (
    <ShimmerHome />
  ) : (
    <div>
      {suggestedVideos.length > 0 &&
        suggestedVideos.map((suggestedVideo) => {
          return (
            <Link
              to={`/watch?v=${suggestedVideo?.id?.videoId}`}
              key={suggestedVideo?.id?.videoId}
            >
              <SuggestedVideoCard video={suggestedVideo} />
            </Link>
          );
        })}
    </div>
  );
};

export default VideoSuggestions;
