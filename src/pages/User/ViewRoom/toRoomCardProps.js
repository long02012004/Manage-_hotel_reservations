import { resolveImageUrl } from "../../../utils/resolveImageUrl";

export const toRoomCardProps = (d) => ({
  id: d.id,
  title: d.title,
  image: resolveImageUrl(d.image),   // ✅ ảnh chuẩn
  guests: d.guests,
  size: d.size,
  beds: d.beds ? (Array.isArray(d.beds) ? d.beds : [d.beds]) : [],
  view: d.view,
  address: d.address,
  desc: d.description,
  price: d.price,
  oldPrice: d.oldPrice,
  discount: d.discount,
  amenities: {
    nonSmoking: !!d.nonSmoking,
    hairDryer: !!d.hairDryer,
    airConditioning: !!d.airConditioning,
    wifi: !!d.wifi,
    petsAllowed: !!d.petsAllowed,
  },
});
