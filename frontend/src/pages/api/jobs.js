export default function handler(req, res) {
    const jobs = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "Remote",
        salary: "$70,000 - $90,000",
      },
      {
        id: 2,
        title: "UI/UX Designer",
        company: "DesignPro",
        location: "New York, USA",
        salary: "$80,000 - $100,000",
      },
      {
        id: 3,
        title: "Backend Engineer",
        company: "DevHub",
        location: "San Francisco, USA",
        salary: "$90,000 - $110,000",
      },
    ];
  
    res.status(200).json(jobs);
  }
  