USE [StudentManagement]
GO
/****** Object:  User [IIS APPPOOL\DefaultAppPool]    Script Date: 12/30/2018 6:35:41 PM ******/
CREATE USER [IIS APPPOOL\DefaultAppPool] FOR LOGIN [IIS APPPOOL\DefaultAppPool] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [IIS APPPOOL\DefaultAppPool]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [IIS APPPOOL\DefaultAppPool]
GO
/****** Object:  Table [dbo].[Classes]    Script Date: 12/30/2018 6:35:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Classes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[DepartmentId] [int] NOT NULL,
 CONSTRAINT [PK_Classes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Departments]    Script Date: 12/30/2018 6:35:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
 CONSTRAINT [PK_Departments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Scores]    Script Date: 12/30/2018 6:35:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Scores](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StudentId] [int] NOT NULL,
	[SubjectId] [int] NOT NULL,
	[Mark] [float] NOT NULL,
 CONSTRAINT [PK_Scores] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Students]    Script Date: 12/30/2018 6:35:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Students](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LastName] [nvarchar](max) NULL,
	[FirstName] [nvarchar](max) NULL,
	[ClassId] [int] NOT NULL CONSTRAINT [DF__Students__ClassI__267ABA7A]  DEFAULT ((0)),
	[StudentCode] [nvarchar](50) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
 CONSTRAINT [PK_Students] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Subjects]    Script Date: 12/30/2018 6:35:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subjects](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
 CONSTRAINT [PK_Subjects] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Teachers]    Script Date: 12/30/2018 6:35:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teachers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[SubjectId] [int] NULL,
	[DepartmentId] [int] NOT NULL,
	[IsManager] [bit] NOT NULL,
 CONSTRAINT [PK_Teachers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[z_Role]    Script Date: 12/30/2018 6:35:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[z_Role](
	[SystemName] [nvarchar](50) NOT NULL,
	[Display] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_z_Role] PRIMARY KEY CLUSTERED 
(
	[SystemName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[z_User]    Script Date: 12/30/2018 6:35:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[z_User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[DisplayName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[Salt] [nvarchar](max) NOT NULL,
	[RoleId] [nvarchar](50) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_z_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Classes] ON 

INSERT [dbo].[Classes] ([Id], [Name], [DepartmentId]) VALUES (14, N'D14CQCP01', 8)
SET IDENTITY_INSERT [dbo].[Classes] OFF
SET IDENTITY_INSERT [dbo].[Departments] ON 

INSERT [dbo].[Departments] ([Id], [Name]) VALUES (8, N'Information technology')
SET IDENTITY_INSERT [dbo].[Departments] OFF
SET IDENTITY_INSERT [dbo].[Students] ON 

INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (1, N'Sang', N'Nguyen', 14, N'N14', CAST(N'1996-02-24' AS Date))
INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (2, N'An', N'Nguyen', 14, N'N02', CAST(N'1996-02-25' AS Date))
INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (3, N'An', N'Nguyen', 14, N'N02', CAST(N'1997-03-09' AS Date))
INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (6, N'Anh', N'Tran', 14, N'N04', CAST(N'1996-04-24' AS Date))
SET IDENTITY_INSERT [dbo].[Students] OFF
SET IDENTITY_INSERT [dbo].[Subjects] ON 

INSERT [dbo].[Subjects] ([Id], [Name]) VALUES (2, N'C++')
SET IDENTITY_INSERT [dbo].[Subjects] OFF
SET IDENTITY_INSERT [dbo].[Teachers] ON 

INSERT [dbo].[Teachers] ([Id], [FirstName], [LastName], [SubjectId], [DepartmentId], [IsManager]) VALUES (3, N'Nguyen', N'Van Anh', NULL, 8, 0)
INSERT [dbo].[Teachers] ([Id], [FirstName], [LastName], [SubjectId], [DepartmentId], [IsManager]) VALUES (4, N'Nguyen', N'Thi Cê', NULL, 8, 0)
SET IDENTITY_INSERT [dbo].[Teachers] OFF
INSERT [dbo].[z_Role] ([SystemName], [Display]) VALUES (N'admin', N'Admin')
INSERT [dbo].[z_Role] ([SystemName], [Display]) VALUES (N'manager', N'Quản lý')
INSERT [dbo].[z_Role] ([SystemName], [Display]) VALUES (N'student', N'Sinh viên')
INSERT [dbo].[z_Role] ([SystemName], [Display]) VALUES (N'teacher', N'Giảng viên')
SET IDENTITY_INSERT [dbo].[z_User] ON 

INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (12, N'Nguyễn', N'Sang', N'Sang Nguyễn', N'VaagcgnK2m5wmxOhgrv0YgmwkB9aMb5TzxYN3WF4DAg=', N'kWO7Fg==', N'admin', N'sangnguyen')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (13, N'Lê', N'Lựu', N'Lê Thị Lựu', N'M55UReFgvJylV4YH3Nl0dk114q1kvCjh9bNt8Jy7ATM=', N'r4XHnQ==', N'teacher', N'leluu')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (14, N'Minh', N'Minh', N'Công Văn Minh', N'3D+u32bsWiqp02+uQOXf7ufCo97WRlIZ1s0L1rLSy3M=', N'Uu3PeA==', N'manager', N'minhcong')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (15, N'Uy', N'Tín', N'Uy Văn Tín', N'rOqHHUgRONExpjXXhMXldM70mlb7dpYacN/vMg54Zkk=', N'hlDbvA==', N'student', N'uytin')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (16, N'Cần', N'Cù', N'Cần Văn Cù', N'zNm1XJLdMaQ14pApfZQisvWehasxFVRiW8FQES11HWs=', N'IgIjWQ==', N'manager', N'cucan')
SET IDENTITY_INSERT [dbo].[z_User] OFF
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_z_User]    Script Date: 12/30/2018 6:35:42 PM ******/
ALTER TABLE [dbo].[z_User] ADD  CONSTRAINT [IX_z_User] UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Classes]  WITH CHECK ADD  CONSTRAINT [FK_Classes_Departments_DepartmentId] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Departments] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Classes] CHECK CONSTRAINT [FK_Classes_Departments_DepartmentId]
GO
ALTER TABLE [dbo].[Scores]  WITH CHECK ADD  CONSTRAINT [FK_Scores_Students_StudentId] FOREIGN KEY([StudentId])
REFERENCES [dbo].[Students] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Scores] CHECK CONSTRAINT [FK_Scores_Students_StudentId]
GO
ALTER TABLE [dbo].[Scores]  WITH CHECK ADD  CONSTRAINT [FK_Scores_Subjects_SubjectId] FOREIGN KEY([SubjectId])
REFERENCES [dbo].[Subjects] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Scores] CHECK CONSTRAINT [FK_Scores_Subjects_SubjectId]
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD  CONSTRAINT [FK_Students_Classes_ClassId] FOREIGN KEY([ClassId])
REFERENCES [dbo].[Classes] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Students] CHECK CONSTRAINT [FK_Students_Classes_ClassId]
GO
ALTER TABLE [dbo].[Teachers]  WITH CHECK ADD  CONSTRAINT [FK_Teachers_Departments_DepartmentId] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Departments] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Teachers] CHECK CONSTRAINT [FK_Teachers_Departments_DepartmentId]
GO
ALTER TABLE [dbo].[Teachers]  WITH CHECK ADD  CONSTRAINT [FK_Teachers_Subjects_SubjectId] FOREIGN KEY([SubjectId])
REFERENCES [dbo].[Subjects] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Teachers] CHECK CONSTRAINT [FK_Teachers_Subjects_SubjectId]
GO
ALTER TABLE [dbo].[z_User]  WITH CHECK ADD  CONSTRAINT [FK_z_User_z_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[z_Role] ([SystemName])
GO
ALTER TABLE [dbo].[z_User] CHECK CONSTRAINT [FK_z_User_z_Role]
GO
