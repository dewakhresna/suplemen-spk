import environment from "@/config/environment";

export const useProfilePicture = (imagePath?: string | null) => {
  const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const getProfileUrl = () => {
    if (!imagePath || imagePath === "user.jpg" || imagePath === "") {
      return defaultAvatar;
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${environment.Domain}${imagePath}`;
  };
  return getProfileUrl();
};