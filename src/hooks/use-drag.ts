import { useEffect } from "react";

import { useDragStore } from "@/stores/drag-store";

const BOUNDARY_PADDING = 0;

export const useDrag = () => {
  const {
    isDragging,
    position,
    elementRef,
    setIsDragging,
    setPosition,
    setElementRef,
  } = useDragStore();

  const ensurePositionInBounds = () => {
    if (!elementRef) return;

    const rect = elementRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let newX = position.x;
    let newY = position.y;

    if (newX + rect.width > viewportWidth - BOUNDARY_PADDING) {
      newX = viewportWidth - rect.width - BOUNDARY_PADDING;
    }
    if (newX < BOUNDARY_PADDING) {
      newX = BOUNDARY_PADDING;
    }

    if (newY + rect.height > viewportHeight - BOUNDARY_PADDING) {
      newY = viewportHeight - rect.height - BOUNDARY_PADDING;
    }
    if (newY < BOUNDARY_PADDING) {
      newY = BOUNDARY_PADDING;
    }

    if (newX !== position.x || newY !== position.y) {
      setPosition({ x: newX, y: newY });
      elementRef.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !elementRef) return;

      const rect = elementRef.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newX = position.x + e.movementX;
      let newY = position.y + e.movementY;

      if (newX < BOUNDARY_PADDING) {
        newX = BOUNDARY_PADDING;
      }

      if (newX + rect.width > viewportWidth - BOUNDARY_PADDING) {
        newX = viewportWidth - rect.width - BOUNDARY_PADDING;
      }

      if (newY < BOUNDARY_PADDING) {
        newY = BOUNDARY_PADDING;
      }

      if (newY + rect.height > viewportHeight - BOUNDARY_PADDING) {
        newY = viewportHeight - rect.height - BOUNDARY_PADDING;
      }

      elementRef.style.transform = `translate(${newX}px, ${newY}px)`;
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position, elementRef, setIsDragging, setPosition]);

  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return { startDragging, setElementRef, ensurePositionInBounds };
};
