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

CREATE TABLE Followers (
  id INT IDENTITY(1,1) PRIMARY KEY,
  userId INT NOT NULL,
  followerId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (followerId) REFERENCES Users(id)
);

CREATE TABLE Following (
  id INT IDENTITY(1,1) PRIMARY KEY,
  userId INT NOT NULL,
  followingId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (followingId) REFERENCES Users(id)
);

CREATE TABLE Posts (
  id INT IDENTITY(1,1) PRIMARY KEY,
  userId INT NOT NULL,
  [desc] NVARCHAR(MAX) NOT NULL,
  likes NVARCHAR(MAX),
  createdAt DATETIME DEFAULT GETDATE(),
  [image] NVARCHAR(MAX),
  FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Chats (
  id INT IDENTITY(1,1) PRIMARY KEY,
  member1Id INT NOT NULL,
  member2Id INT NOT NULL,
  createdAt DATETIME DEFAULT GETDATE(),
  updatedAt DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (member1Id) REFERENCES Users(id),
  FOREIGN KEY (member2Id) REFERENCES Users(id)
);

CREATE TABLE Messages (
  id INT IDENTITY(1,1) PRIMARY KEY,
  chatId INT NOT NULL,
  senderId INT NOT NULL,
  [text] NVARCHAR(MAX),
  createdAt DATETIME DEFAULT GETDATE(),
  updatedAt DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (chatId) REFERENCES Chats(id),
  FOREIGN KEY (senderId) REFERENCES Users(id)
);
