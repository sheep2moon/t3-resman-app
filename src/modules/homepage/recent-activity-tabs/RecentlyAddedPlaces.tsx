import { Image as ImageType, Place, PlaceType } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { UseQueryResult } from "react-query";
import { getPlaceImageSrc } from "../../../utils/getImageSrc";
import { usePlacesMapStore } from "../../../zustand/placesMapStore";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import Button from "../../common/Button";
import LoadingSpinner from "../../common/LoadingSpinner";

type RecentlyAddedPlacesProps = {
    queryResult: UseQueryResult<(Place & { images: ImageType[]; type: PlaceType })[]>;
};

const RecentlyAddedPlaces = ({ queryResult }: RecentlyAddedPlacesProps) => {
    const { setCurrentPlaceId, setIsPlaceModalOpen } = usePlacesMapStore(state => state);
    const router = useRouter();

    const handleViewPlace = (placeId: string) => {
        setCurrentPlaceId(placeId);
        setIsPlaceModalOpen(true);
        router.push("/places-map");
    };

    if (queryResult.isLoading)
        return (
            <div className="relative h-full w-full">
                <LoadingSpinner />
            </div>
        );
    return (
        <div className="grid h-full  w-full gap-2 overflow-x-auto overflow-y-scroll lg:grid-cols-3">
            {queryResult.data?.map(place => (
                <div key={place.id} className="relative z-0 h-full min-h-[12rem] w-full min-w-[260px] max-w-md rounded-md text-light shadow-md shadow-black/30 dark:shadow-black/60">
                    {place.images[0] && <Image className="rounded-md object-cover" alt="" src={getPlaceImageSrc(place.images[0].id)} layout="fill" />}
                    <div className="absolute inset-0 z-10 flex w-full flex-col justify-between rounded-md bg-black/60 p-2 ">
                        <p className="text-center text-lg">{place.displayName}</p>
                        <div className="flex items-center justify-between">
                            <PlaceTypeBadge placeType={place.type} size="sm" />
                            <Button onClick={() => handleViewPlace(place.id)} variant="alternative" className="text-base">
                                Zobacz
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentlyAddedPlaces;
