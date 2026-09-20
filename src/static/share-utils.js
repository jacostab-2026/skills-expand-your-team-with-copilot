(function (global) {
  function getInitialSharedActivity(search) {
    const sharedActivity = new URLSearchParams(search).get("activity");

    if (!sharedActivity) {
      return {
        sharedActivityName: "",
        searchQuery: "",
      };
    }

    return {
      sharedActivityName: sharedActivity,
      searchQuery: sharedActivity,
    };
  }

  function getActivityShareUrl(currentUrl, activityName) {
    const shareUrl = new URL(currentUrl);
    shareUrl.searchParams.set("activity", activityName);
    return shareUrl.toString();
  }

  function getActivityShareText(activityName, scheduleText) {
    return `Check out ${activityName} at Mergington High School. ${scheduleText}.`;
  }

  const activityShareUtils = {
    getInitialSharedActivity,
    getActivityShareUrl,
    getActivityShareText,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = activityShareUtils;
  }

  global.activityShareUtils = activityShareUtils;
})(typeof window !== "undefined" ? window : globalThis);
