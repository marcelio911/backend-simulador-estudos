#!/bin/bash

pkg --compress GZip -t node18-linux-x64 --out-path build .

./build/backend-simulator-microservices

#  The  --compress  flag is used to compress the package. The  -t  flag is used to specify the target platform. The  --out-path  flag is used to specify the output directory.
#  The  .  at the end of the command is used to specify the current directory as the source directory.
#  The  pkg  command will create a new directory called  build  in the current directory and place the packaged application in it.
#  To build the application, run the following command:
#  $ bash build-linux.sh

#  The packaged application will be created in the  build  directory.
#  Conclusion
#  In this article, you learned how to package a Node.js application into an executable file using the  pkg  package.
#  You also learned how to package the application for different platforms, such as Windows, macOS, and Linux.
#  If you have any questions or feedback, feel free to leave a comment.
#  node.js
#  pkg
#  executable

#    Share this article  Share this article
