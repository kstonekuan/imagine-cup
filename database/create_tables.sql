DROP TABLE IF EXISTS Sessions;
DROP TABLE IF EXISTS Connections;
DROP TABLE IF EXISTS Profiles;

CREATE TABLE Profiles (
    ProfileId int IDENTITY(1,1) PRIMARY KEY,
	MicrosoftId varchar(255),
	GoogleId varchar(255),
	FacebookId varchar(255),
	TwitterId varchar(255),
	GitHubId varchar(255),
    Name varchar(255),
	Email varchar(255),
	Mobile varchar(255),
	Social varchar(255),
	Summary varchar(max),
);

CREATE TABLE Connections (
    ConnectionId int IDENTITY(1,1) PRIMARY KEY,
    MentorId int FOREIGN KEY REFERENCES Profiles(ProfileId),
    MenteeId int FOREIGN KEY REFERENCES Profiles(ProfileId),
    IsActive bit,
	Notes varchar(max)
);

CREATE TABLE Sessions (
    SessionId int IDENTITY(1,1) PRIMARY KEY,
    ConnectionId int FOREIGN KEY REFERENCES Connections(ConnectionId),
	Link varchar(255),
	Timeslot datetime,
	LengthMinutes int, 
	CompletionStatus varchar(255),
	MentorAgenda varchar(max),
	MentorFeedback varchar(max),
	MenteeAgenda varchar(max),
	MenteeFeedback varchar(max),
);