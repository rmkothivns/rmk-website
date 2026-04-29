import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inject } from "@vercel/analytics";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, Mail, MapPin, Menu, Phone, Star, Users, X, Image } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import Loader from "./Loader";

import { useGetAllGuestReviews, useGetRooms, useSubmitBookingInquiry } from "../hooks/useQueries";


/* Seed reviews  */
const SEED_REVIEWS = [{
  guestName: "Prabhakar Kalavacherla",
  rating: BigInt(5),
  comment: "My wife and I waited for a long time to visit Benares- several decades. We wanted to stay at a place that was modern and ancient at the same time. Clearly, BrijRama Palace met that criteria but it is pricey place. Almost by chance I chanced upon Rudreshwar Mahadeo Kothi. I will say that photos online won't do justice as one has to experience the hospitality and warmth of these two elderly couple that run the place. Dr. Kiran and Dr. Balaji have mastered the age old Indian art of treating guests like Gods. Dr. Kiran in particular is just amazing and her quiet personality coupled with her inexhausible sense of service is just out of the world.\n\nThe facilities are not necessarily top notch when compared to a good star hotel. However, please don't even get disuaded by that as the warmth and hospitality more than compensates for any shortcomings.\n\nThe house itself is steeped in centuries of history and it is right in the heart of the temple area. My wife and I could not help feeling low when it was time to leave the place. But we made a promise to visit Benares and this next time our place of stay is determined. Thank you Dr. Kiran and Dr. Balaji.",
  stayDate: "6 weeks ago"
}, {
  guestName: "Krishma Maniar",
  rating: BigInt(5),
  comment: "Our stay was very delightful at Rudreshwar Mahadeo Kothi. Mr & Mrs Singh are the warmest host. Very helpful, guided us so well, helped us arrange boat ride n darshan. The property is 200 meters away from the kashi vishwanath temple, it was very convenient. Delicious breakfast. We booked family room, for us family of 4.Clean and neat rooms.",
  stayDate: "9 weeks ago"
}, {
  guestName: "finding nemu",
  rating: BigInt(5),
  comment: "This stay is beyond rating - this place is priceless. Balaji uncle and Kiran Aunty are the best hosts you will ever find on Airbnb, India. The stay is right in the heart of the old city of Benaras. The ghats and Vishwanath Dham are at a walkable ditance. There are plenty of shops and restaurants around. The stay offered a luggage transport support as well. The food at the stay is delicious. I didn‘t feel the need to eat outside as we got warm homemade food. Whatever I and my husband needed, uncle got it ready for us. This property is an ancestral heritage with a Shiv temple right in its courtyard. The hosts also gave us the opportunity of Rudra Abhishek in the temple. At the stay, we tried the banarasi pan and all special benarasi sweets. Kiran Aunty recommended us to even visit Sarnath which we undertook to experience Buddha‘s first sermon. I am not sure how to thank Uncle and Aunty for the best homestay experience I have ever had in any part of India. This place was totally worth it. Here we were not guests, rather part of a family. I had tears in my eyes as I had to bid bye to this place. This stay and Benaras will forever be in our hearts. See you soon !",
  stayDate: "Recently"
}, {
  guestName: "jonnalagadda keerthi",
  rating: BigInt(5),
  comment: "One of the best places to stay in Kashi—just a two-minute walk from Kashi Vishwanath Mandir and very close to all other temples and ghats. The house was incredibly beautiful, well maintained, and the bathrooms were spotlessly clean. the place was calm and serene. Kiran Aunty, Balaji Uncle, and the staff Akshay and Akash Bhaiyya were extremely warm and welcoming—it truly felt like visiting our relatives in Kashi. The best part was the temple within the house. The homemade food was absolutely delicious. Thank you for the wonderful hospitality; this would be our go to place in Kashi and we will definitely recommend this place to everyone.",
  stayDate: "13 weeks ago"
}, {
  guestName: "Neelesh Saran",
  rating: BigInt(5),
  comment: "Homely, and perfectly kept",
  stayDate: "15 weeks ago"
}, {
  guestName: "Bhavna Sharma",
  rating: BigInt(5),
  comment: "Very nice and homely stay\nWill definitely recommend\nA home away from your home.\nOur host Mr and Mrs Singh will definitely treat you as their own children\nYou will be comfortable as it's your home.",
  stayDate: "18 weeks ago"
}, {
  guestName: "Shivangi Singh",
  rating: BigInt(5),
  comment: "Rudreshwar Mahadeo Kothi in Kashi is more than just a place; it's an experience that touches the soul. ✨\nThe moment you step inside, you're enveloped in an atmosphere of profound peace and spirituality.\nThe intricate architecture and the serene ambiance create a perfect setting for reflection and devotion. Every corner of the kothi resonates with history and devotion, making it a must-visit for anyone seeking a deeper connection with the divine.\nPlus, the hosts Dr.V.N Singh and Dr.Kiran Singh are incredibly wonderful. They made us feel so comfortable, it just felt like home. They made sure that we don’t have any problems at all, and the major plus point is- it's conveniently located just a two-minute walk from the Kashi Vishwanath Temple!\nHighly recommended stay if you’re visiting Varanasi. It's a place that leaves a lasting impression on your heart. 💞",
  stayDate: "20 weeks ago"
}, {
  guestName: "Shruti Bansal",
  rating: BigInt(5),
  comment: "I had a wonderful stay at this homestay! The place was clean, cozy, and beautifully maintained. The hosts were warm, welcoming, and always ready to help",
  stayDate: "20 weeks ago"
}, {
  guestName: "abhishek pandey",
  rating: BigInt(5),
  comment: "Right in the heart of the city , this is a must stay place. Easy access to Kashi Viswanath ji and other famous street food next dooor is a blessing. And a beautiful temple within the compound just makes it blissful.\n\nA truly warm host in VN Singh sir and wondeful caretakers (Akash & Akshay) made the stay memorable. When you get delicious home cooked food - made to order what else can you ask for.\n\nRooms are great.. just be mindful of the noisy ones on special festive evenings, with windows facing the main street.",
  stayDate: "22 weeks ago"
}, {
  guestName: "SB0901",
  rating: BigInt(5),
  comment: "An Incredibly Beautiful House .. very aesthetically done ... super comfortable ... an Old World Charm... best location to stay in Varanasi , everything is just minutes-walk away .. Hosts are very warm and super Caring.. we had a great stay there and would definetely be staying there in future too .",
  stayDate: "51 weeks ago"
}];

/*  Room type  */

/* Room images map */
// map from room index to an array of image URLs; carousel buttons let the user
// scroll through the list. ensure the assets exist or update names accordingly.
const ROOM_IMAGES = {
  0: ["/assets/generated/kashi-suite/room-kashi-suite-1.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-2.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-3.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-4.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-5.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-6.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-7.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-8.dim_600x400.jpg"],
  1: ["/assets/generated/Superior Room With Street View/room-superior-street-1.dim_600x400.jpg", "/assets/generated/Superior Room With Street View/room-superior-street-2.dim_600x400.jpg", "/assets/generated/Superior Room With Street View/room-superior-street-3.dim_600x400.jpg", "/assets/generated/Superior Room With Street View/room-superior-street-4.dim_600x400.jpg", "/assets/generated/Superior Room With Street View/room-superior-street-5.dim_600x400.jpg"],
  2: ["/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-1.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-2.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-3.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-4.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-5.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-6.dim_600x400.jpg"],
  3: ["/assets/generated/Standard Room With Private Bathroom/room-standard-1.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-2.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-3.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-4.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-5.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-6.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-7.dim_600x400.jpg"]
};

/* Gallery images  */
const GALLERY_IMAGES = [{
  src: "/assets/generated/rmk_entry/kothi_1.jpg",
  alt: "Haveli exterior 1"
}, {
  src: "/assets/generated/rmk_entry/kothi_2.jpg",
  alt: "Haveli exterior 2"
}, {
  src: "/assets/generated/rmk_entry/kothi_3.jpg",
  alt: "Haveli details 3"
}, {
  src: "/assets/generated/rmk_entry/kothi_4.jpg",
  alt: "Haveli details 4"
}, {
  src: "/assets/generated/rmk_entry/kothi_5.jpg",
  alt: "Haveli details 5"
}, {
  src: "/assets/generated/rmk_entry/kothi_6.jpg",
  alt: "Haveli details 6"
}, {
  src: "/assets/generated/rmk_entry/kothi_7.jpg",
  alt: "Haveli details 7"
}, {
  src: "/assets/generated/rmk_entry/kothi_8.png",
  alt: "Haveli sign 8"
}, {
  src: "/assets/generated/rmk_entry/kothi_9.png",
  alt: "Haveli sign 9"
}, {
  src: "/assets/generated/rmk_entry/kothi_10.png",
  alt: "Haveli interior 10"
}, {
  src: "/assets/generated/rmk_entry/kothi_11.png",
  alt: "Haveli interior 11"
}, {
  src: "/assets/generated/rmk_entry/kothi_12.png",
  alt: "Haveli interior 12"
}, {
  src: "/assets/generated/rmk_entry/kothi_13.png",
  alt: "Haveli interior 13"
}, {
  src: "/assets/generated/rmk_entry/kothi_14.png",
  alt: "Haveli interior 14"
}, {
  src: "/assets/generated/rmk_entry/kothi_15.png",
  alt: "Haveli interior 15"
}, {
  src: "/assets/generated/rmk_entry/kothi_16.png",
  alt: "Haveli interior 16"
}, {
  src: "/assets/generated/rmk_entry/kothi_17.png",
  alt: "Haveli interior 17"
}, {
  src: "/assets/generated/rmk_entry/kothi_18.png",
  alt: "Haveli interior 18"
}, {
  src: "/assets/generated/rmk_entry/kothi_19.png",
  alt: "Haveli interior 19"
}, {
  src: "/assets/generated/rmk_entry/kothi_20.png",
  alt: "Haveli interior 20"
}, {
  src: "/assets/generated/rmk_entry/kothi_21.png",
  alt: "Haveli interior 21"
}, {
  src: "/assets/generated/rmk_entry/kothi_22.png",
  alt: "Haveli interior 22"
}];

/* Image Lightbox  */

function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  roomName = "Room"
}) {
  if (!isOpen || images.length === 0) return null;
  const currentImage = images[currentIndex];
  const imageNumber = currentIndex + 1;
  const totalImages = images.length;
  return <AnimatePresence>
    {isOpen && <>
      {/* Backdrop */}
      <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/95 z-50" />

      {/* Lightbox Content */}
      <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
        {/* Close Button */}
        <motion.button initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={e => {
          e.stopPropagation();
          onClose();
        }} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50" aria-label="Close lightbox">
          <X className="w-6 h-6" />
        </motion.button>

        {/* Image Counter */}
        <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute top-6 left-6 text-white text-sm font-medium">
          {roomName} - {imageNumber} / {totalImages}
        </motion.div>

        {/* Main Image Container */}
        <div className="relative w-full h-full flex items-center justify-center max-w-7xl">
          <motion.img key={currentIndex} src={currentImage} alt={`${roomName} - Image ${imageNumber}`} initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.95
          }} transition={{
            duration: 0.2
          }} className="max-w-full max-h-[80vh] object-contain" />

          {/* Left Arrow */}
          {totalImages > 1 && <motion.button initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} onClick={onPrev} className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors group" aria-label="Previous image">
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>}

          {/* Right Arrow */}
          {totalImages > 1 && <motion.button initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} onClick={onNext} className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors group" aria-label="Next image">
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>}
        </div>

        {/* Image Indicator Dots */}
        {totalImages > 1 && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute bottom-6 flex gap-2">
          {images.map((_, idx) => <motion.button key={idx} onClick={() => {
            // This would require additional state management
            // For now, we'll keep arrow navigation only
          }} className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"}`} aria-label={`Go to image ${idx + 1}`} />)}
        </motion.div>}
      </motion.div>
    </>}
  </AnimatePresence>;
}

// small reusable card used by RoomsGrid so each instance can manage its own
// image index state.

function RoomCard({
  room,
  idx,
  onInquire,
  onImageClick,
  roomMarker,
  inquireMarker,
  bookNowMarker
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const images = ROOM_IMAGES[idx] || [];
  const prev = () => {
    setDirection(-1);
    setImgIdx(i => (i - 1 + images.length) % images.length);
  };
  const next = () => {
    setDirection(1);
    setImgIdx(i => (i + 1) % images.length);
  };
  const slideVariants = {
    enter: dir => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: dir => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0
    })
  };
  return <motion.div data-ocid={roomMarker} variants={fadeUp} className="room-card rounded-2xl overflow-hidden bg-card border border-border shadow-xs hover:shadow-md transition-shadow flex flex-col">
    {/* Room image carousel */}
    <div onClick={() => onImageClick?.(idx, imgIdx)} className="overflow-hidden h-48 relative group bg-muted cursor-pointer">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        {images.length > 0 ? <motion.img key={imgIdx} src={images[imgIdx]} alt={room.name} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
          x: {
            type: "spring",
            stiffness: 500,
            damping: 40,
            mass: 0.5,
            duration: 0.3
          },
          opacity: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
          {/* placeholder in case no image available */}
          <Image className="w-6 h-6 text-muted-foreground" />
        </div>}
      </AnimatePresence>
      {images.length > 1 && <>
        <button onClick={e => {
          e.stopPropagation();
          prev();
        }} className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-black/30 hover:bg-black/60 text-white rounded-full p-1 transition-all duration-200 hover:scale-110">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={e => {
          e.stopPropagation();
          next();
        }} className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-black/30 hover:bg-black/60 text-white rounded-full p-1 transition-all duration-200 hover:scale-110">
          <ChevronRight className="w-4 h-4" />
        </button>
      </>}
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
          {room.name}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
          <Users className="w-3.5 h-3.5" />
          <span className="text-xs">Up to {Number(room.maxGuests)}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {room.description}
      </p>

      {/* Amenity tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {room.amenities.slice(0, 4).map(a => <Badge key={a} variant="secondary" className="text-xs font-normal rounded-full bg-secondary text-secondary-foreground">
          {a}
        </Badge>)}
        {room.amenities.length > 4 && <Badge variant="secondary" className="text-xs font-normal rounded-full bg-secondary/60 text-secondary-foreground/60">
          +{room.amenities.length - 4} more
        </Badge>}
      </div>

      {/* Buttons */}
      <div className="mt-auto flex flex-col gap-2">
        <Button data-ocid={bookNowMarker} onClick={() => window.open(room.bookingUrl || "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns", "_blank")} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
          Book Now
        </Button>
        <Button data-ocid={inquireMarker} onClick={onInquire} variant="outline" className="w-full border-border rounded-full text-sm">
          Inquire
        </Button>
      </div>
    </div>
  </motion.div>;
}
const FALLBACK_ROOMS = [{
  name: "Kashi Family Suite",
  description: "Expansive suite on the second floor with two interconnected rooms and an attached bathroom. The inner room opens to a private balcony with a rare view of the Shiva temple inside the haveli and the street leading to Kashi Vishwanath Temple.",
  amenities: ["King + Double Bed", "En-suite Bathroom", "Fast Wi-Fi", "Air Conditioner", "Electric Kettle", "Balcony with Temple View", "Premium Vegan Toiletries"],
  pricePerNight: BigInt(0),
  maxGuests: BigInt(4),
  bookingUrl: "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns"
}, {
  name: "Superior Room - Street View",
  description: "Airy room on the second floor opening directly onto the haveli courtyard. Features a queen-size bed, attached bathroom, and heritage charm. Ideal for guests seeking a peaceful atmosphere in the heart of the old city.",
  amenities: ["Queen Bed", "En-suite Bathroom", "Fast Wi-Fi", "Air Conditioner", "Sitting Area with Coffee Table", "Terrace Access", "Premium Vegan Toiletries"],
  pricePerNight: BigInt(0),
  maxGuests: BigInt(2),
  bookingUrl: "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns"
}, {
  name: "Superior Room - Terrace Access",
  description: "Located beside the family suite on the second floor, this room features a king-size bed and attached bathroom. Step outside to a terrace balcony overlooking the quiet haveli rooftop - perfect for a morning cup of tea.",
  amenities: ["King-size Bed", "En-suite Bathroom", "Fast Wi-Fi", "Air Conditioner", "Electric Kettle", "Terrace Balcony Access", "Premium Vegan Toiletries"],
  pricePerNight: BigInt(0),
  maxGuests: BigInt(2),
  bookingUrl: "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns"
}, {
  name: "Standard Room - Private Bathroom",
  description: "Peaceful first-floor room with a queen-size bed and a private (detached) bathroom. Features a view of the temple path from the window and opens out to the inner haveli courtyard - a serene space to reflect.",
  amenities: ["Queen Bed", "Private Bathroom", "Fast Wi-Fi", "Air Conditioner", "Purified Drinking Water", "Terrace Access", "Premium Vegan Toiletries"],
  pricePerNight: BigInt(0),
  maxGuests: BigInt(2),
  bookingUrl: "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns"
}];

/*  Distance highlights */
const DISTANCES = [{
  place: "Kashi Vishwanath Temple",
  time: "3 min",
  type: "walk"
}, {
  place: "Dashashwamedh Ghat",
  time: "8 min",
  type: "walk"
}, {
  place: "Manikarnika Ghat",
  time: "10 min",
  type: "walk"
}, {
  place: "Kaal Bhairav Temple",
  time: "19 min",
  type: "walk"
}, {
  place: "Banaras Hindu University",
  time: "25 min",
  type: "ride"
}, {
  place: "Varanasi Jn. Railway Station",
  time: "26 min",
  type: "ride"
}];

/*  House rules */
const HOUSE_RULES = ["Switch off AC, lights and fan before leaving your room", "Quiet hours: 22:00 - 06:00", "Only vegetarian food & drinks allowed", "Smoking allowed outdoors only", "No eating in bedrooms - please use the dining area", "Damages are chargeable"];

/* Star component */
const STAR_POSITIONS = [1, 2, 3, 4, 5];
function StarRating({
  rating,
  max = 5
}) {
  return <div className="flex gap-0.5">
    {STAR_POSITIONS.slice(0, max).map(pos => <Star key={pos} className={`w-4 h-4 ${pos <= rating ? "star-filled" : "star-empty"}`} />)}
  </div>;
}

/* Fade-in section animation  */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};
import { useNavigate, useParams } from "@tanstack/react-router";
import { blogs } from "./BlogsData";
/* APP */
export default function BlogDetails() {

 const { slug } = useParams({ select: (params) => params });
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return <h2>Blog Not Found 😢</h2>;


  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxRoomIdx, setLightboxRoomIdx] = useState(0);
  const [lightboxImageIdx, setLightboxImageIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);
  const navLinks = [{
    href: "#about",
    label: "About"
  }, {
    href: "#rooms",
    label: "Rooms"
  }, {
    href: "#amenities",
    label: "Amenities"
  }, {
    href: "#gallery",
    label: "Gallery"
  }, {
    href: "#reviews",
    label: "Reviews"
  }, {
    href: "/blog",
    label: "Blog"
  }, {
    href: "#contact",
    label: "Contact"
  }
];
  const handleNavClick = href => {
    if (href.startsWith("#")) {
      if (window.location.pathname !== "/") {
        navigate({ to: "/", hash: href.substring(1) });
      } else {
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth"
        });
      }
    } else {
      navigate({
        to: href
      });
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
  };
  const handleImageClick = (roomIdx, imageIdx) => {
    setLightboxRoomIdx(roomIdx);
    setLightboxImageIdx(imageIdx);
    setLightboxOpen(true);
  };

  // open lightbox for gallery images
  const handleGalleryClick = idx => {
    // treat gallery as a pseudo-room index of -1
    setLightboxRoomIdx(-1);
    setLightboxImageIdx(idx);
    setLightboxOpen(true);
  };
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };
  const getCurrentImageArray = () => {
    if (lightboxRoomIdx === -1) {
      return GALLERY_IMAGES.map(i => i.src);
    }
    return ROOM_IMAGES[lightboxRoomIdx] || [];
  };
  const handlePrevImage = () => {
    const images = getCurrentImageArray();
    setLightboxImageIdx(prev => (prev - 1 + images.length) % images.length);
  };
  const handleNextImage = () => {
    const images = getCurrentImageArray();
    setLightboxImageIdx(prev => (prev + 1) % images.length);
  };

  // Keyboard event handler
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = e => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxRoomIdx]);
  return <div className="relative min-h-screen font-body">
    <AnimatePresence>
      {loading && <Loader onFinish={() => setLoading(false)} />}
    </AnimatePresence>
    {!loading && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }}>
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border-b border-black/5"
      >
        <nav className="max-w-[100rem] mx-auto px-6 sm:px-12 lg:px-20 h-[6.5rem] lg:h-[8.5rem] flex items-center justify-between">

          {/* Logo Area (Left) */}
          <div className="flex-1 flex justify-start">
            <button type="button" onClick={e => {
              e.preventDefault();
              handleNavClick("#hero");
            }} className="relative shrink-0 block overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src="/Rudreshwar%20Mahadeo%20Kothi.png"
                alt="Rudreshwar Mahadeo Kothi Logo"
                className="h-20 lg:h-[7.5rem] w-auto object-contain origin-left"
              />
            </button>
          </div>

          {/* Desktop Nav Links (Center) */}
          <ul className="hidden lg:flex flex-1 items-center justify-center gap-10">
            {navLinks.map((link, idx) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
              >
                <a href={link.href} data-ocid={`nav.${link.label.toLowerCase()}.link`} onClick={e => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }} className="relative text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-zinc-600 hover:text-black transition-colors py-2 group">
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-400 ease-out group-hover:w-full"></span>
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Action Area (Right) */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
              <Button data-ocid="nav.book_button" onClick={() => window.open("https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns", "_blank")} className="hidden sm:flex bg-primary text-white hover:bg-black hover:text-white transition-colors duration-500 text-xs sm:text-sm tracking-[0.15em] uppercase px-8 sm:px-10 py-6 sm:py-7 rounded-none font-semibold shadow-none">
                Book Now
              </Button>
            </motion.div>
            <button type="button" className="lg:hidden p-3 bg-zinc-50 hover:bg-zinc-100 transition-colors text-black border border-zinc-200" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-zinc-100 overflow-hidden shadow-2xl absolute w-full left-0 top-full"
            >
              <div className="px-6 py-8 flex flex-col gap-4">
                {navLinks.map(link => (
                  <a key={link.href} href={link.href} onClick={e => {
                    e.preventDefault();
                    handleNavClick(link.href);
                    setMobileMenuOpen(false);
                  }} className="py-2 text-sm uppercase tracking-widest font-medium text-zinc-600 hover:text-black transition-colors">
                    {link.label}
                  </a>
                ))}
                <div className="pt-6 mt-2 border-t border-zinc-100">
                  <Button data-ocid="nav.book_button" onClick={() => window.open("https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns", "_blank")} className="bg-primary text-white w-full rounded-none py-7 font-semibold tracking-[0.1em] uppercase text-sm">
                    Book Your Stay
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div>

      <main className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 relative z-10 bg-background">
          



    
    

{/* Start Blog Details */}
 {/* SEO META */}
<title>{blog.seo.title}</title>
<meta name="description" content={blog.seo.description} />
<meta name="keywords" content={blog.seo.keywords} />

<meta property="og:title" content={blog.seo.title} />
<meta property="og:description" content={blog.seo.description} />
<meta property="og:image" content={blog.seo.image} />

        
 <main className="pt-2 sm:pt-3 pb-20 px-4 sm:px-6 relative z-10 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <Badge variant="secondary" className="mb-4">Experiences</Badge>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight mb-6">
              {blog.title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
               {blog.desc}
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden mb-12 shadow-lg border border-border">
              <img src={blog.img} alt="Ganga River Varanasi" className="w-full h-[400px] sm:h-[500px] object-cover" />
            </div>

            <article className="prose prose-lg dark:prose-invert prose-amber max-w-none text-muted-foreground"   dangerouslySetInnerHTML={{ __html: blog.content }}>
            
            </article>
          </div>
        </main>

{/* End Blog Details */}

   
 

          <div className="section-divider" />

</main>
        {/* Footer */}
        <footer className="footer-gradient bg-zinc-950 text-white pt-24 pb-12 px-4 sm:px-6 relative z-10 overflow-hidden">
          {/* Ambient background glows - Optimised for Performance */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle,rgba(139,35,35,0.15)_0%,transparent_60%)] rounded-full pointer-events-none transform translate-y-1/2" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
              {/* Brand & Newsletter */}
              <div className="lg:col-span-5 space-y-8">
                <div className="flex flex-col items-start">
                  <div className="bg-white/95 px-6 py-4 rounded-xl shadow-lg border border-white/10 inline-block mb-2">
                    <img src="/Rudreshwar%20Mahadeo%20Kothi.png" alt="Rudreshwar Mahadeo Kothi Logo" className="h-20 sm:h-40 w-auto object-cover" />
                  </div>
                </div>
                <p className="text-zinc-400 leading-relaxed text-lg max-w-sm">
                  A 300-year-old heritage haveli offering royal elegance and deep spirituality in the heart of ancient Varanasi.
                </p>
                <div className="pt-4">
                  <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4">Subscribe for offers</p>
                  <div className="flex bg-zinc-900 border border-zinc-800 rounded-full p-1.5 max-w-md focus-within:border-primary/50 transition-colors">
                    <input type="email" placeholder="Email address" className="bg-transparent border-none text-white px-4 py-2 w-full text-sm focus:outline-none" />
                    <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6">Join</Button>
                  </div>
                </div>
              </div>

              {/* Navigation Group */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                {/* Contact */}
                <div className="space-y-6">
                  <h4 className="font-semibold text-sm uppercase tracking-widest text-zinc-100">Reach Us</h4>
                  <ul className="space-y-4">
                    <li>
                      <a href="tel:+919335106436" className="group flex items-start gap-3 text-zinc-400 hover:text-white transition-colors">
                        <div className="mt-1 p-2 bg-zinc-900 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-sm leading-relaxed">
                          +91 9335106436<br />
                          +91 9889244273
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:rmkothivns@gmail.com" className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                        <div className="p-2 bg-zinc-900 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-sm">rmkothivns@gmail.com</span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Location */}
                <div className="space-y-6">
                  <h4 className="font-semibold text-sm uppercase tracking-widest text-zinc-100">Location</h4>
                  <div className="group flex items-start gap-3 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                    <div className="mt-1 p-2 bg-zinc-900 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm leading-relaxed">
                      CK-37/29, Bansphatak Road,<br />
                      Gate No.1 Near Pitambari Saree<br />
                      Varanasi 221001, UP, India
                    </span>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-6">
                  <h4 className="font-semibold text-sm uppercase tracking-widest text-zinc-100">Quick Links</h4>
                  <ul className="space-y-3">
                    {["About", "Rooms", "Amenities", "Gallery", "Reviews", "Contact"].map(item => (
                      <li key={item}>
                        <a href={`#${item.toLowerCase()}`} onClick={e => {
                          e.preventDefault();
                          handleNavClick(`#${item.toLowerCase()}`);
                        }} className="text-sm text-zinc-400 hover:text-primary hover:translate-x-1 inline-block transition-all cursor-pointer">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-zinc-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-zinc-500 font-medium">
                © {new Date().getFullYear()} Rudreshwar Mahadeo Kothi. All rights reserved. Managed by Dr V.N. Singh.
              </p>
              <div className="flex items-center gap-6 text-sm text-zinc-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox isOpen={lightboxOpen} images={getCurrentImageArray()} currentIndex={lightboxImageIdx} onClose={handleCloseLightbox} onPrev={handlePrevImage} onNext={handleNextImage} roomName={lightboxRoomIdx === -1 ? "Gallery" : FALLBACK_ROOMS[lightboxRoomIdx]?.name || "Room"} />
    </motion.div>}
  </div>;
}

/* 
   ROOMS GRID */
function RoomsGrid({
  onInquire,
  onImageClick
}) {
  const {
    data: rooms,
    isLoading
  } = useGetRooms();
  const displayRooms = rooms && rooms.length > 0 ? rooms.map((room, idx) => ({
    ...room,
    bookingUrl: FALLBACK_ROOMS[idx]?.bookingUrl ?? ""
  })) : FALLBACK_ROOMS;
  const roomMarkers = ["rooms.item.1", "rooms.item.2", "rooms.item.3", "rooms.item.4"];
  const inquireMarkers = ["rooms.inquire_button.1", "rooms.inquire_button.2", "rooms.inquire_button.3", "rooms.inquire_button.4"];
  const bookNowMarkers = ["rooms.primary_button.1", "rooms.primary_button.2", "rooms.primary_button.3", "rooms.primary_button.4"];
  if (isLoading) {
    return <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border animate-pulse">
        <div className="h-48 bg-muted" />
        <div className="p-5 space-y-3">
          <div className="h-5 bg-muted rounded w-2/3" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
        </div>
      </div>)}
    </div>;
  }
  return <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {displayRooms.slice(0, 4).map((room, idx) => <RoomCard key={room.name} room={room} idx={idx} onInquire={onInquire} onImageClick={onImageClick} roomMarker={roomMarkers[idx]} inquireMarker={inquireMarkers[idx]} bookNowMarker={bookNowMarkers[idx]} />)}
  </div>;
}

/* REVIEWS */
function ReviewsSection() {
  const {
    data: fetchedReviews,
    isLoading
  } = useGetAllGuestReviews();
  const allReviews = [...SEED_REVIEWS, ...(fetchedReviews ?? [])];
  const reviewMarkers = ["reviews.item.1", "reviews.item.2", "reviews.item.3"];
  if (isLoading) {
    return <div className="grid sm:grid-cols-3 gap-5">
      {[1, 2, 3].map(i => <div key={i} className="rounded-2xl bg-card border border-border p-5 animate-pulse space-y-3">
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-4/5" />
      </div>)}
    </div>;
  }
  if (allReviews.length === 0) {
    return <div data-ocid="reviews.empty_state" className="text-center py-16 px-4 rounded-2xl bg-card border border-border">
      <Star className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
      <p className="font-medium text-foreground">No reviews yet</p>
      <p className="text-sm text-muted-foreground mt-1">
        Be the first to share your experience!
      </p>
    </div>;
  }
  return <div className="grid sm:grid-cols-3 gap-5">
    {allReviews.slice(0, 9).map((review, idx) => <ReviewItem key={`${review.guestName}-${idx}`} review={review} idx={idx} marker={reviewMarkers[idx] ?? `reviews.item.${idx + 1}`} />)}
  </div>;
}
function ReviewItem({
  review,
  idx,
  marker
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.comment.length > 200;
  return <motion.div data-ocid={marker} variants={fadeUp} className="bg-card rounded-2xl border border-border p-5 flex flex-col shadow-xs h-fit">
    {/* Stars */}
    <StarRating rating={Number(review.rating)} />

    {/* Comment */}
    <div className="mt-3 mb-4 flex-1 flex flex-col items-start w-full">
      <p className={`text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap ${!isExpanded && isLong ? "line-clamp-5" : ""}`}>
        "{review.comment}"
      </p>
      {isLong && <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs font-semibold text-primary mt-2 hover:underline cursor-pointer focus:outline-none">
        {isExpanded ? "Read Less" : "Read More"}
      </button>}
    </div>

    {/* Guest info */}
    <div className="pt-3 border-t border-border/50 mt-auto w-full">
      <p className="font-semibold text-sm text-foreground">
        {review.guestName}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {review.stayDate}
      </p>
    </div>
  </motion.div>;
}

/*
   BOOKING FORM */
function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = useSubmitBookingInquiry();
  const formRef = useRef(null);
  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({
        name: form.name,
        email: form.email,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        numberOfGuests: BigInt(form.guests || "1"),
        message: form.message
      });
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
        message: ""
      });
    } catch {
      // error handled by mutation state
    }
  };
  if (submitted) {
    return <motion.div data-ocid="booking.success_state" initial={{
      opacity: 0,
      scale: 0.96
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="text-center py-16 px-6 bg-card rounded-2xl border border-border shadow-xs">
      <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
      <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
        Inquiry Sent!
      </h3>
      <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
        Thank you for reaching out. Team Rudreshwar will confirm availability within 24 hours.
      </p>
      <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6 rounded-full border-border">
        Send Another Inquiry
      </Button>
    </motion.div>;
  }
  return <form ref={formRef} onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xs space-y-5">
    {submitMutation.isPending && <div data-ocid="booking.loading_state" className="flex items-center gap-2 text-sm text-muted-foreground bg-muted rounded-lg px-4 py-3">
      <Loader2 className="w-4 h-4 animate-spin" />
      Sending your inquiry...
    </div>}

    {submitMutation.isError && <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/8 rounded-lg px-4 py-3">
      Something went wrong. Please try again.
    </div>}

    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-medium">
          Full Name
        </Label>
        <Input id="name" name="name" data-ocid="booking.name_input" placeholder="Your full name" value={form.name} onChange={handleChange} required className="rounded-lg bg-background border-input" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <Input id="email" name="email" type="email" data-ocid="booking.email_input" placeholder="you@email.com" value={form.email} onChange={handleChange} required className="rounded-lg bg-background border-input" />
      </div>
    </div>

    <div className="grid sm:grid-cols-3 gap-4">
      <div className="space-y-1.5">
        <Label htmlFor="checkIn" className="text-sm font-medium">
          Check-in Date
        </Label>
        <Input id="checkIn" name="checkIn" type="date" data-ocid="booking.checkin_input" value={form.checkIn} onChange={handleChange} required className="rounded-lg bg-background border-input" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="checkOut" className="text-sm font-medium">
          Check-out Date
        </Label>
        <Input id="checkOut" name="checkOut" type="date" data-ocid="booking.checkout_input" value={form.checkOut} onChange={handleChange} required className="rounded-lg bg-background border-input" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="guests" className="text-sm font-medium">
          Guests
        </Label>
        <Input id="guests" name="guests" type="number" min="1" max="10" data-ocid="booking.guests_input" placeholder="2" value={form.guests} onChange={handleChange} required className="rounded-lg bg-background border-input" />
      </div>
    </div>

    <div className="space-y-1.5">
      <Label htmlFor="message" className="text-sm font-medium">
        Message{" "}
        <span className="text-muted-foreground font-normal">(optional)</span>
      </Label>
      <Textarea id="message" name="message" data-ocid="booking.message_textarea" placeholder="Any special requests, room preferences, or questions for the team..." value={form.message} onChange={handleChange} rows={4} className="rounded-lg bg-background border-input resize-none" />
    </div>

    <Button data-ocid="booking.submit_button" type="submit" disabled={submitMutation.isPending} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-base">
      {submitMutation.isPending ? <>
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Sending...
      </> : "Send Booking Inquiry"}
    </Button>

    <p className="text-xs text-muted-foreground text-center">
      We typically respond within 24 hours. No payment required at this stage.
    </p>
  </form>;
  inject();
}
