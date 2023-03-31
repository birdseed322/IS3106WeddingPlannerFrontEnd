
export default function DataTableTemplateCutoutStuff() {

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case "INSTOCK":
                return "success";

            case "LOWSTOCK":
                return "warning";

            case "OUTOFSTOCK":
                return "danger";

            default:
                return null;
        }
    };
    
    return null;
}