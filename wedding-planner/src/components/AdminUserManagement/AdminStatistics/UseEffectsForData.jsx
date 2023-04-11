export const generateVendorCategoryData = (vendorsData, setVendorsCategoryData) => {
    const categoryCount = {
        ENTERTAINMENT: 0,
        FOOD: 0,
        LIGHTING: 0,
        DECORATION: 0,
        DRESSES_SUITS: 0,
        VENUE: 0,
    };

    vendorsData.forEach((vendor) => {
        categoryCount[vendor.category]++;
    });

    const pieChartData = {
        labels: ["Entertainment", "Food", "Lighting", "Decoration", "Dresses & Suits", "Venue"],
        datasets: [
            {
                // label: "Vendor Categories",
                data: [
                    categoryCount.ENTERTAINMENT,
                    categoryCount.FOOD,
                    categoryCount.LIGHTING,
                    categoryCount.DECORATION,
                    categoryCount.DRESSES_SUITS,
                    categoryCount.VENUE,
                ],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "lightgreen",
                    "brown",
                    "magenta",
                ],
                hoverOffset: 4,
            },
        ],
    };
    setVendorsCategoryData(pieChartData);
}

export const generateUserCountData = (weddingOrganisersData, vendorsData, setUsersCountData) => {
        const pieChartData = {
            labels: ["Wedding Organisers", "Vendors"],
            datasets: [
                {
                    // label: "Vendor Categories",
                    data: [weddingOrganisersData.length, vendorsData.length],
                    backgroundColor: [
                        "pink",
                        "rgb(54, 162, 235)",
                    ],
                    hoverOffset: 4,
                },
            ],
        };
        setUsersCountData(pieChartData);
}

export const generateTransactionsByCategoryData = (groupedTransactionsData, setTransactionsByCategory) => {
    
    // groupedTransactionsData is of the form:
    // [{category: "FOOD", totalValue: 10}, {} , ...]
    
    const pieChartData = {
        labels: groupedTransactionsData.map(pairObj => pairObj.category),
        datasets: [
            {
                data: groupedTransactionsData.map(pairObj => pairObj.totalValue),
                backGroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "lightgreen",
                    "brown",
                    "magenta",
                ],
                hoverOffset: 4,
            }
        ]
    }
    
    setTransactionsByCategory(pieChartData);
}