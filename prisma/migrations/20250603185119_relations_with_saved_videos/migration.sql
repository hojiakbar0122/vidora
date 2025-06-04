-- AddForeignKey
ALTER TABLE "Saved_Video" ADD CONSTRAINT "Saved_Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved_Video" ADD CONSTRAINT "Saved_Video_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
