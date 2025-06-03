import { useEffect, useState } from 'react';

type GitHubProfile = {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  html_url: string;
};

function App() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/Dolsity')
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-4 rounded-xl shadow-xl max-w-md bg-white dark:bg-gray-900 text-center">
      <img src={profile.avatar_url} className="rounded-full w-24 mx-auto" alt="avatar" />
      <h2 className="text-2xl font-bold mt-2">{profile.name}</h2>
      <p className="text-gray-500">@{profile.login}</p>
      <p className="mt-2">{profile.bio}</p>
      <a href={profile.html_url} className="text-blue-500 mt-2 block" target="_blank">
        View on GitHub
      </a>
    </div>
  )
}

export default App
