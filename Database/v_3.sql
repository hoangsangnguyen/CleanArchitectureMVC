USE [StudentManagement]
GO
/****** Object:  User [IIS APPPOOL\DefaultAppPool]    Script Date: 1/7/2019 10:31:52 AM ******/
CREATE USER [IIS APPPOOL\DefaultAppPool] FOR LOGIN [IIS APPPOOL\DefaultAppPool] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [IIS APPPOOL\DefaultAppPool]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [IIS APPPOOL\DefaultAppPool]
GO
/****** Object:  Table [dbo].[Classes]    Script Date: 1/7/2019 10:31:52 AM ******/
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
/****** Object:  Table [dbo].[Departments]    Script Date: 1/7/2019 10:31:52 AM ******/
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
/****** Object:  Table [dbo].[Scores]    Script Date: 1/7/2019 10:31:52 AM ******/
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
/****** Object:  Table [dbo].[Students]    Script Date: 1/7/2019 10:31:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Students](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LastName] [nvarchar](max) NULL,
	[FirstName] [nvarchar](max) NULL,
	[ClassId] [int] NOT NULL,
	[StudentCode] [nvarchar](50) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
 CONSTRAINT [PK_Students] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subjects]    Script Date: 1/7/2019 10:31:52 AM ******/
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
/****** Object:  Table [dbo].[Teachers]    Script Date: 1/7/2019 10:31:52 AM ******/
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
/****** Object:  Table [dbo].[z_Role]    Script Date: 1/7/2019 10:31:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[z_Role](
	[SystemName] [nvarchar](50) NOT NULL,
	[Display] [nvarchar](50) NOT NULL,
	[Level] [int] NOT NULL,
 CONSTRAINT [PK_z_Role] PRIMARY KEY CLUSTERED 
(
	[SystemName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[z_User]    Script Date: 1/7/2019 10:31:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[z_User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[DisplayName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](255) NOT NULL,
	[Salt] [nvarchar](255) NOT NULL,
	[RoleId] [nvarchar](50) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_z_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Classes] ON 

INSERT [dbo].[Classes] ([Id], [Name], [DepartmentId]) VALUES (14, N'D14CQCP01', 8)
INSERT [dbo].[Classes] ([Id], [Name], [DepartmentId]) VALUES (18, N'D14CQPT01', 10)
INSERT [dbo].[Classes] ([Id], [Name], [DepartmentId]) VALUES (19, N'D15CQDT01', 26)
SET IDENTITY_INSERT [dbo].[Classes] OFF
SET IDENTITY_INSERT [dbo].[Departments] ON 

INSERT [dbo].[Departments] ([Id], [Name]) VALUES (8, N'Information technology')
INSERT [dbo].[Departments] ([Id], [Name]) VALUES (10, N'Multimedia')
INSERT [dbo].[Departments] ([Id], [Name]) VALUES (22, N'Multimedia 2')
INSERT [dbo].[Departments] ([Id], [Name]) VALUES (24, N'Economics')
INSERT [dbo].[Departments] ([Id], [Name]) VALUES (26, N'Electronics')
SET IDENTITY_INSERT [dbo].[Departments] OFF
SET IDENTITY_INSERT [dbo].[Scores] ON 

INSERT [dbo].[Scores] ([Id], [StudentId], [SubjectId], [Mark]) VALUES (1, 1, 2, 10)
SET IDENTITY_INSERT [dbo].[Scores] OFF
SET IDENTITY_INSERT [dbo].[Students] ON 

INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (1, N'Sang', N'Nguyen', 14, N'N14', CAST(N'1996-02-24' AS Date))
INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (2, N'An', N'Nguyen', 14, N'N02', CAST(N'1996-02-25' AS Date))
INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (13, N'Nhàn', N'An Thị', 14, N'N12', CAST(N'1996-10-17' AS Date))
INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (14, N'Văn Tín', N'Uy', 14, N'N15', CAST(N'1996-02-17' AS Date))
INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (16, N'Thị Lựu', N'Lê', 14, N'N14001', CAST(N'1994-01-01' AS Date))
INSERT [dbo].[Students] ([Id], [LastName], [FirstName], [ClassId], [StudentCode], [DateOfBirth]) VALUES (19, N'Văn Rải', N'Đinh', 14, N'N14002', CAST(N'1995-05-05' AS Date))
SET IDENTITY_INSERT [dbo].[Students] OFF
SET IDENTITY_INSERT [dbo].[Subjects] ON 

INSERT [dbo].[Subjects] ([Id], [Name]) VALUES (2, N'C#')
INSERT [dbo].[Subjects] ([Id], [Name]) VALUES (3, N'Data structure Algorithm')
SET IDENTITY_INSERT [dbo].[Subjects] OFF
SET IDENTITY_INSERT [dbo].[Teachers] ON 

INSERT [dbo].[Teachers] ([Id], [FirstName], [LastName], [SubjectId], [DepartmentId], [IsManager]) VALUES (3, N'Nguyen', N'Van Anh', NULL, 8, 1)
INSERT [dbo].[Teachers] ([Id], [FirstName], [LastName], [SubjectId], [DepartmentId], [IsManager]) VALUES (4, N'Nguyen', N'Thi Cê', NULL, 8, 0)
INSERT [dbo].[Teachers] ([Id], [FirstName], [LastName], [SubjectId], [DepartmentId], [IsManager]) VALUES (5, N'Trần', N'Thị Huệ', NULL, 24, 0)
INSERT [dbo].[Teachers] ([Id], [FirstName], [LastName], [SubjectId], [DepartmentId], [IsManager]) VALUES (7, N'Huỳnh', N'Bánh', NULL, 10, 0)
SET IDENTITY_INSERT [dbo].[Teachers] OFF
INSERT [dbo].[z_Role] ([SystemName], [Display], [Level]) VALUES (N'admin', N'Admin', 1)
INSERT [dbo].[z_Role] ([SystemName], [Display], [Level]) VALUES (N'manager', N'Quản lý', 2)
INSERT [dbo].[z_Role] ([SystemName], [Display], [Level]) VALUES (N'student', N'Sinh viên', 3)
INSERT [dbo].[z_Role] ([SystemName], [Display], [Level]) VALUES (N'teacher', N'Giảng viên', 4)
SET IDENTITY_INSERT [dbo].[z_User] ON 

INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (12, N'Nguyễn', N'Sang', N'Sang Nguyễn', N'VaagcgnK2m5wmxOhgrv0YgmwkB9aMb5TzxYN3WF4DAg=', N'kWO7Fg==', N'admin', N'sangnguyen')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (13, N'Lê', N'Lựu', N'Lê Thị Lựu', N'M55UReFgvJylV4YH3Nl0dk114q1kvCjh9bNt8Jy7ATM=', N'r4XHnQ==', N'teacher', N'leluu')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (14, N'Minh', N'Minh', N'Công Văn Minh', N'3D+u32bsWiqp02+uQOXf7ufCo97WRlIZ1s0L1rLSy3M=', N'Uu3PeA==', N'manager', N'minhcong')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (15, N'Uy', N'Tín', N'Uy Văn Tín', N'rOqHHUgRONExpjXXhMXldM70mlb7dpYacN/vMg54Zkk=', N'hlDbvA==', N'student', N'uytin')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (16, N'Cần', N'Cù', N'Cần Văn Cù', N'zNm1XJLdMaQ14pApfZQisvWehasxFVRiW8FQES11HWs=', N'IgIjWQ==', N'manager', N'cucan')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (18, N'Le', N'Thi Dao', N'Lê Thị Đào', N'GY9K3NjObq71rn8TeQhTJEijsjsdMK4SP2JlbevTQ58=', N'uCLD6Q==', N'student', N'daole')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (21, N'Lê', N'Thị Lựu', N'Lê Thị Lựu', N'8RGc8fPOqU9dXfJn2sDPN+fU4tSKSc/ejvuskwP7YyE=', N'9SAP1w==', N'student', N'N14001')
INSERT [dbo].[z_User] ([Id], [FirstName], [LastName], [DisplayName], [Password], [Salt], [RoleId], [UserName]) VALUES (22, N'Huỳnh', N'Bánh', N'Huỳnh Bánh', N'Au8oVNvyi6Q5TSqLdh6sBcCC7OfZ45hGkr5huAN4YOI=', N'ZAkoPA==', N'teacher', N'huỳnhbánh')
SET IDENTITY_INSERT [dbo].[z_User] OFF
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_z_User]    Script Date: 1/7/2019 10:31:53 AM ******/
ALTER TABLE [dbo].[z_User] ADD  CONSTRAINT [IX_z_User] UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Students__ClassI__267ABA7A]  DEFAULT ((0)) FOR [ClassId]
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
