-- AddForeignKey
ALTER TABLE "Playlist_Video" ADD CONSTRAINT "Playlist_Video_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist_Video" ADD CONSTRAINT "Playlist_Video_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
