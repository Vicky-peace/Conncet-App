create Database Connect_App

CREATE TABLE Users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username NVARCHAR(255) NOT NULL,
  password NVARCHAR(255) NOT NULL,
  firstname NVARCHAR(255) NOT NULL,
  lastname NVARCHAR(255) NOT NULL,
  isAdmin BIT DEFAULT 0,
  profilePicture NVARCHAR(MAX),
  coverPicture NVARCHAR(MAX),
  about NVARCHAR(MAX),
  livesIn NVARCHAR(255),
  worksAt NVARCHAR(255),
  relationship NVARCHAR(255),
  country NVARCHAR(255),
  createdAt DATETIME DEFAULT GETDATE(),
  updatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Posts (
  id INT IDENTITY(1,1) PRIMARY KEY,
  userId INT NOT NULL,
  [desc] NVARCHAR(MAX) NOT NULL,
  createdAt DATETIME DEFAULT GETDATE(),
  [image] NVARCHAR(MAX),
  FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Chat (
  id INT IDENTITY(1, 1) PRIMARY KEY,
  members NVARCHAR(MAX) NOT NULL,
  userId INT NOT NULL,
  createdAt DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Message (
  id INT IDENTITY(1, 1) PRIMARY KEY,
  chatId INT NOT NULL,
  senderId INT NOT NULL,
  [text] NVARCHAR(MAX),
  createdAt DATETIME DEFAULT GETDATE(),
  updatedAt DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (chatId) REFERENCES Chat(id),
  FOREIGN KEY (senderId) REFERENCES Users(id)
);


CREATE TABLE Relationship
(
    id INT PRIMARY KEY IDENTITY(1,1),
    followeruserId INT,
    followeduserId INT,
    
    FOREIGN KEY (followeruserId) REFERENCES Users(id),
    FOREIGN KEY (followeduserId) REFERENCES Users(id)
);

 CREATE TABLE Comments
(
    id INT PRIMARY KEY IDENTITY,
    description VARCHAR(200),
    userId INT,
    postId INT,
	createdAt DATETIME

    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (postId) REFERENCES Posts(id)
);


CREATE TABLE Likes
(
    id INT PRIMARY KEY IDENTITY(1,1),
    likesuserId INT,
    postuserId INT,
    
    FOREIGN KEY (likesuserId) REFERENCES Users(id),
    FOREIGN KEY (postuserId) REFERENCES Posts(id)
);