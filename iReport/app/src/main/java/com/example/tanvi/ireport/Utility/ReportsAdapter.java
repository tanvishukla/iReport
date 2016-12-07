package com.example.tanvi.ireport.Utility;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.tanvi.ireport.R;
import com.example.tanvi.ireport.Model.Report_Item;

import java.util.List;

/**
 * Created by tanvi on 12/2/2016.
 */

public class ReportsAdapter extends BaseAdapter {

    Context context;
    List<Report_Item> reportList;

    public ReportsAdapter(Context context, List<Report_Item> reportList) {
        this.context = context;
        this.reportList = reportList;
    }

    private class ViewHolder{

        ImageView imageView;
        TextView textName;
        TextView textStatus;
        TextView textDateTime;

    }


    @Override
    public int getCount() {
        return reportList.size();
    }

    @Override
    public Object getItem(int i) {

        return reportList.get(i);

    }

    @Override
    public long getItemId(int i) {
        return reportList.indexOf(getItem(i));
    }

    public View getView(int position, View convertView, ViewGroup parent){


        ViewHolder holder =null;

        LayoutInflater layoutInflater = (LayoutInflater) context.getSystemService(Activity.LAYOUT_INFLATER_SERVICE);


        if(convertView == null){

            convertView = layoutInflater.inflate(R.layout.list_row,null);

            holder = new ViewHolder();
            holder.textName = (TextView) convertView.findViewById(R.id.reportName);
            holder.textDateTime = (TextView) convertView.findViewById(R.id.dateTime);
            holder.textStatus = (TextView) convertView.findViewById(R.id.status);
            holder.imageView = (ImageView) convertView.findViewById(R.id.list_image);
            convertView.setTag(holder);
        }
        else{
            holder = (ViewHolder) convertView.getTag();
        }

        Report_Item report = (Report_Item)getItem(position);
        holder.textName.setText(report.getName());
        holder.textDateTime.setText(report.getDateTime());
        holder.textStatus.setText(report.getStatus());
        holder.imageView.setImageResource(report.getImageURL());

        return convertView;


    }


}
