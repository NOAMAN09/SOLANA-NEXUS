
import React from "react";
import { NFTInfo } from "@/types/solana";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { shortenAddress } from "@/utils/formatters";

interface NFTGalleryProps {
  nfts: NFTInfo[];
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ nfts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {nfts.length > 0 ? (
        nfts.map((nft) => (
          <Card key={nft.mint} className="overflow-hidden card-hover group">
            <div className="relative">
              <AspectRatio ratio={1 / 1} className="bg-muted">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/400x400/png?text=NFT";
                  }}
                />
              </AspectRatio>
              {nft.collection && (
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full">
                  {nft.collection.name}
                </div>
              )}
            </div>
            <CardHeader className="p-3">
              <h3 className="font-medium text-sm truncate">{nft.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {shortenAddress(nft.mint)}
              </p>
            </CardHeader>
            {nft.attributes && nft.attributes.length > 0 && (
              <CardContent className="p-3 pt-0">
                <div className="flex flex-wrap gap-1">
                  {nft.attributes.slice(0, 3).map((attr, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-muted px-2 py-0.5 rounded-full truncate"
                      title={`${attr.trait_type}: ${attr.value}`}
                    >
                      {attr.value}
                    </span>
                  ))}
                  {nft.attributes.length > 3 && (
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      +{nft.attributes.length - 3}
                    </span>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center p-10">
          <p className="text-muted-foreground">No NFTs found in your wallet</p>
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
