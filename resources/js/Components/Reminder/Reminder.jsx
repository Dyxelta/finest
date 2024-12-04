import { AnimatePresence, motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import ReminderCards from "./ReminderCards";

const Reminder = ({
  collapseRef,
  open,
  toggleOpen,
  reminders = [],
  Card,
  Typography,
}) => {
  return (
    <div ref={collapseRef} className=" text-primary relative">
      <div onClick={toggleOpen} className="bg-none cursor-pointer bg-white p-3 rounded-md hover:bg-gray-100 transition-all duration-300 ease-in-out">
        <FaBell size={24} />
      </div>
      <div className="absolute z-50 mt-1 text-primary right-0 bottom-0 translate-y-[100%]">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <Card className="my-2 mx-auto h-[400px] w-[320px] border-2 border-primary rounded-md text-primary">
                <div className="px-4 pt-2">
                  <Typography className="header-5 border-b border-primary pb-1">
                    Notifications
                  </Typography>
                </div>

                <div className="overflow-y-scroll overflow-x-hidden custom-scrollbar flex flex-col">
                  {reminders?.map((reminder) => (
                    <ReminderCards key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reminder;